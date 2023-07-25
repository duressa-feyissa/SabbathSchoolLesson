import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  Alert,
  AlertIcon,
  Spinner,
  useToast,
  useColorMode,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import APIClient from "../services/apiClinetAPI";
import { useLangQueryStore } from "../store";
import useLesson from "../hooks/useLesson";
import Lesson from "../entities/Lesson";

const schema = z.object({
  title: z.string().nonempty("Title is required"),
  memorial_script: z.string().nonempty("Description is required"),
  start_date: z.string().nonempty("Start Date is required"),
  end_date: z.string().nonempty("End Date is required"),
  id: z.string().nonempty("Quarter is required"),
});

type FormData = z.infer<typeof schema>;

const SelectedLessons = [
  { value: "01", label: "Lesson 1" },
  { value: "02", label: "Lesson 2" },
  { value: "03", label: "Lesson 3" },
  { value: "04", label: "Lesson 4" },
  { value: "05", label: "Lesson 5" },
  { value: "06", label: "Lesson 6" },
  { value: "07", label: "Lesson 7" },
  { value: "08", label: "Lesson 8" },
  { value: "09", label: "Lesson 9" },
  { value: "10", label: "Lesson 10" },
  { value: "11", label: "Lesson 11" },
  { value: "12", label: "Lesson 12" },
  { value: "13", label: "Lesson 13" },
  { value: "14", label: "Lesson 14" },
];

const LessonForm = () => {
  const navigate = useNavigate();
  const language = useLangQueryStore((state) => state.language);

  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === "dark";
  const color = isDarkMode ? "green.100" : "green.900";

  const {
    lang = "",
    quarterId = "",
    lessonId = "",
  } = useParams<{
    lang: string;
    quarterId: string;
    lessonId: string;
  }>();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { data: lesson, isLoading } = useLesson(lang, quarterId, lessonId);

  useEffect(() => {
    if (quarterId && lang && lesson) {
      setValue("title", lesson.title);
      setValue("start_date", lesson.start_date);
      setValue("end_date", lesson.end_date);
      setValue("id", lesson.id);
      setValue("memorial_script", lesson.memorial_script);
    }
  }, [lang, quarterId, lesson, setValue, lessonId]);

  const onSubmit = async (data: FieldValues) => {
    const apiClient = new APIClient<Lesson>(
      `/v1/${lang}/quarters/${quarterId}/lessons`
    );
    const sendData = {
      title: data["title"],
      start_date: data["start_date"],
      end_date: data["end_date"],
      id: lessonId ? lessonId : data["id"],
      memorial_script: data["memorial_script"],
    };

    let toastProps: {
      title: string;
      description: string;
      status: "error" | "success";
    };
    console.log("lessonId", lessonId);
    let res;
    if (lessonId) {
      res = await apiClient.put(lessonId, sendData);
    } else {
      res = await apiClient.post(sendData);
    }

    if (res.status === 200 || res.status === 201)
      navigate(`/${language}/quarters/${quarterId}`);

    // eslint-disable-next-line prefer-const
    toastProps = {
      title: res.status === 200 || res.status === 201 ? "Success" : "Failed",
      description:
        res.status === 200 || res.status === 201
          ? lang
            ? "Lesson is successfully updated!"
            : "Lesson is successfully created!"
          : lang
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
        <Heading mb={4} textAlign="center" color={color}>
          Lesson
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
              <FormLabel>Lesson</FormLabel>
              <Select
                {...register("id")}
                id="id"
                name="id"
                size="md"
                disabled={lessonId ? true : false}
                defaultValue={
                  lesson && lessonId ? lesson.id : SelectedLessons[0].value
                }
              >
                {SelectedLessons.map((lesson) => (
                  <option key={lesson.value} value={lesson.value}>
                    {lesson.label}
                  </option>
                ))}
              </Select>
              {errors.id && (
                <Alert>
                  <AlertIcon />
                  {errors.id.message}
                </Alert>
              )}
            </FormControl>
            <FormControl>
              <FormLabel>Memorial Script</FormLabel>
              <Input
                {...register("memorial_script")}
                id="memorial_script"
                type="text"
                name="memorial_script"
                size="md"
              />
              {errors.memorial_script && (
                <Alert>
                  <AlertIcon />
                  {errors.memorial_script.message}
                </Alert>
              )}
            </FormControl>
            <FormControl>
              <FormLabel>Start Date</FormLabel>
              <Input
                {...register("start_date")}
                type="date"
                id="start_date"
                name="start_date"
                size="md"
              />
              {errors.start_date && (
                <Alert>
                  <AlertIcon />
                  {errors.start_date.message}
                </Alert>
              )}
            </FormControl>
            <FormControl>
              <FormLabel>End Date</FormLabel>
              <Input
                {...register("end_date")}
                type="date"
                id="end_date"
                name="end_date"
                size="md"
              />
              {errors.end_date && (
                <Alert>
                  <AlertIcon />
                  {errors.end_date.message}
                </Alert>
              )}
            </FormControl>
            <Button colorScheme="blue" type="submit">
              {lessonId ? "Update" : "Create"}
            </Button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default LessonForm;
