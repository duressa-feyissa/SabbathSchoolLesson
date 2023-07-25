import {
  Box,
  Heading,
  Input,
  Button,
  Stack,
  FormControl,
  FormLabel,
  Alert,
  AlertIcon,
  useToast,
  Spinner,
  Select,
  Textarea,
  useColorMode,
} from "@chakra-ui/react";
import { useForm, useFieldArray, FieldValues } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Day from "../entities/day";
import { useLangQueryStore } from "../store";
import APIClient from "../services/apiClinetAPI";
import { useNavigate, useParams } from "react-router-dom";
import useDay from "../hooks/useDay";
import { useEffect } from "react";
import useRead from "../hooks/useRead";

const daysSelected = [
  { value: "01", label: "Sunday" },
  { value: "02", label: "Monday" },
  { value: "03", label: "Tuesday" },
  { value: "04", label: "Wednesday" },
  { value: "05", label: "Thursday" },
  { value: "06", label: "Friday" },
  { value: "07", label: "Saturday" },
];

const Schema = z.object({
  title: z.string().nonempty("Title is required"),
  id: z.string().nonempty("Day is required"),
  day: z.string().nonempty("Day is required"),
  date: z.string().nonempty("Date is required"),
  paragraphs: z.array(
    z.object({
      text: z.string().nonempty("Paragraph is required"),
    })
  ),
});

type FormData = z.infer<typeof Schema>;

const DayForm = () => {
  const navigate = useNavigate();
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === "dark";
  const color = isDarkMode ? "green.100" : "green.900";

  const language = useLangQueryStore((state) => state.language);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(Schema),
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "paragraphs",
  });

  const {
    lang = "",
    quarterId = "",
    lessonId = "",
    dayId = "",
  } = useParams<{
    lang: string;
    quarterId: string;
    lessonId: string;
    dayId: string;
  }>();

  const { data: day, isLoading } = useDay(quarterId, lessonId, dayId);
  const { data: read } = useRead(language, quarterId, lessonId, dayId);
  const toast = useToast();

  useEffect(() => {
    if (dayId && read?.paragraphs && day) {
      setValue("title", day?.title);
      setValue("day", day?.day);
      setValue("id", day?.id);
      setValue("date", day?.date);
      read?.paragraphs?.forEach((paragraph: string, index: number) => {
        setValue(`paragraphs.${index}.text`, paragraph);
      });
      console.log(read.paragraphs);
    } else if (dayId && day) {
      setValue("title", day.title);
      setValue("day", day.day);
      setValue("id", day.id);
      setValue("date", day.date);
    }
  }, [dayId, read, day, setValue]);

  const onSubmit = async (data: FieldValues) => {
    const apiClient = new APIClient<Day>(
      `/v1/${lang}/quarters/${quarterId}/lessons/${lessonId}/days`
    );
    interface Paragraph {
      text: string;
    }
    const sendData = {
      title: data["title"],
      day: data["day"],
      date: data["date"],
      id: dayId ? dayId : data["id"],
      read: data["paragraphs"].map((paragraph: Paragraph) => paragraph.text),
    };

    let toastProps: {
      title: string;
      description: string;
      status: "error" | "success";
    };

    let res;
    if (dayId) {
      res = await apiClient.put(dayId, sendData);
    } else {
      res = await apiClient.post(sendData);
    }

    if (res.status === 200 || res.status === 201)
      navigate(`/${language}/quarters/${quarterId}/lessons/${lessonId}`);

    // eslint-disable-next-line prefer-const
    toastProps = {
      title: res.status === 200 || res.status === 201 ? "Success" : "Failed",
      description:
        res.status === 200 || res.status === 201
          ? dayId
            ? "Day is successfully updated!"
            : "Day is successfully created!"
          : dayId
          ? `${res.data}`
          : `${res.data}`,
      status: res.status === 200 || res.status === 201 ? "success" : "error",
    };
    toast({
      title: toastProps.title,
      position: "bottom-right",
      colorScheme: "blue",
      description: toastProps.description,
      status: toastProps.status,
      duration: 2000,
    });
  };

  if (isLoading) return <Spinner />;

  return (
    <Box w={{ base: "100%", lg: "60%" }}>
      <Box p={6} borderRadius="md" boxShadow="md">
        <Heading textAlign="center" mb={4} color={color}>
          Day
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                {...register("title")}
                id="title"
                type="text"
                name="title"
                size="md"
              />
              {errors.title && (
                <Alert>
                  <AlertIcon />
                  {errors.title.message}
                </Alert>
              )}
            </FormControl>
            <FormControl>
              <FormLabel>Day</FormLabel>
              <Select
                {...register("id")}
                id="id"
                name="id"
                size="md"
                disabled={dayId ? true : false}
                defaultValue={dayId ? dayId : daysSelected[0].value}
              >
                {daysSelected.map((day) => (
                  <option key={day.value} value={day.value}>
                    {day.label}
                  </option>
                ))}
              </Select>
              {errors.day && (
                <Alert>
                  <AlertIcon />
                  {errors.day.message}
                </Alert>
              )}
            </FormControl>
            <FormControl>
              <FormLabel>Day of the Week</FormLabel>
              <Input
                {...register("day")}
                id="day"
                type="text"
                name="day"
                size="md"
              />
              {errors.day && (
                <Alert>
                  <AlertIcon />
                  {errors.day.message}
                </Alert>
              )}
            </FormControl>
            <FormControl>
              <FormLabel>Date</FormLabel>
              <Input
                {...register("date")}
                id="date"
                type="date"
                name="date"
                size="md"
              />
              {errors.date && (
                <Alert>
                  <AlertIcon />
                  {errors.date.message}
                </Alert>
              )}
            </FormControl>
            <FormControl>
              <FormLabel>Paragraphs</FormLabel>
              {fields.map((field, index) => (
                <Stack
                  key={field.id}
                  direction="row"
                  spacing={3}
                  alignItems="center"
                >
                  <Textarea
                    {...register(`paragraphs.${index}.text`, {
                      required: true,
                    })}
                    name={`paragraphs.${index}.text`}
                    height="100px"
                    marginY="7px"
                  />
                  {Array.isArray(errors.paragraphs) &&
                    errors.paragraphs.length > index &&
                    errors.paragraphs[index]?.text && (
                      <Alert status="error">
                        <AlertIcon />
                        {errors.paragraphs[index]?.text.message}
                      </Alert>
                    )}
                  <Button
                    size="sm"
                    colorScheme="red"
                    onClick={() => remove(index)}
                  >
                    Remove
                  </Button>
                </Stack>
              ))}
              <Button
                size="sm"
                colorScheme="blue"
                onClick={() => append({ text: "" })}
              >
                Add
              </Button>
            </FormControl>
            <Button colorScheme="blue" type="submit">
              {dayId ? "Update" : "Create"}
            </Button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default DayForm;
