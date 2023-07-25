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
  Textarea,
  Alert,
  AlertIcon,
  Spinner,
  useToast,
  useColorMode,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import useQuarter from "../hooks/useQuarter";
import { useEffect } from "react";
import APIClient from "../services/apiClinetAPI";
import Quarter from "../entities/Quarter";
import { useLangQueryStore } from "../store";

const schema = z.object({
  title: z.string().nonempty("Title is required"),
  description: z.string().nonempty("Description is required"),
  human_date: z.string().nonempty("Human Date is required"),
  start_date: z.string().nonempty("Start Date is required"),
  end_date: z.string().nonempty("End Date is required"),
  id: z.string().nonempty("Quarter is required"),
  cover: z.string().optional(),
  color_primary: z.string().nonempty("Color primary is required"),
  color_primary_dark: z.string().nonempty("Color primary dark is required"),
  year: z
    .string()
    .min(4, { message: "Only four number value!" })
    .max(4, { message: "Only four number value!" })
    .nonempty("Year is required"),
});

type FormData = z.infer<typeof schema>;

interface Select {
  value: string;
  label: string;
}

const quartersSelect: Select[] = [
  { value: "01", label: "Quarter I" },
  { value: "02", label: "Quarter II" },
  { value: "03", label: "Quarter III" },
  { value: "04", label: "Quarter IV" },
];

const QuarterForm = () => {
  const navigate = useNavigate();
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === "dark";
  const color = isDarkMode ? "green.100" : "green.900";
  const language = useLangQueryStore((state) => state.language);
  const { lang = "", quarterId = "" } = useParams<{
    lang: string;
    quarterId: string;
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

  const { data: quarter, isLoading } = useQuarter(lang, quarterId);

  useEffect(() => {
    if (quarterId && lang && quarter) {
      setValue("title", quarter.title);
      setValue("description", quarter.description);
      setValue("human_date", quarter.human_date);
      setValue("start_date", quarter.start_date);
      setValue("end_date", quarter.end_date);
      setValue("id", quarter.id);
      setValue("color_primary", quarter.color_primary);
      setValue("color_primary_dark", quarter.color_primary_dark);
      setValue("year", quarter.year);
    }
  }, [lang, quarterId, quarter, setValue]);

  const onSubmit = async (data: FieldValues) => {
    const apiClient = new APIClient<Quarter>(`/v1/${lang}/quarters`);
    const sendData = {
      title: data["title"],
      description: data["description"],
      human_date: data["human_date"],
      start_date: data["start_date"],
      end_date: data["end_date"],
      id: quarterId ? quarterId : `${data["year"]}_${data["id"]}`,
      color_primary: data["color_primary"],
      color_primary_dark: data["color_primary_dark"],
      year: data["year"],
    };

    let toastProps: {
      title: string;
      description: string;
      status: "error" | "success";
    };

    let res;
    if (quarterId) {
      res = await apiClient.put(quarterId, sendData);
    } else {
      res = await apiClient.post(sendData);
    }

    // eslint-disable-next-line prefer-const
    toastProps = {
      title: res.status === 200 || res.status === 201 ? "Success" : "Failed",
      description:
        res.status === 200 || res.status === 201
          ? lang
            ? "Quarter is successfully updated!"
            : "Quarter is successfully created!"
          : lang
          ? `${res.data}`
          : `${res.data}`,
      status: res.status === 200 || res.status === 201 ? "success" : "error",
    };

    if (res.status === 200 || res.status === 201) {
      const fileInput = document.querySelector(
        'input[type="file"]'
      ) as HTMLInputElement;

      if (fileInput && fileInput.files && fileInput.files.length > 0) {
        const formData = new FormData();
        formData.append("image", fileInput.files[0]);

        const apiClientUpload = new APIClient<globalThis.FormData>(
          `/v1/${lang}/quarters/${sendData.id}/image`
        );

        const imageRes = await apiClientUpload.post(formData);
        console.log("Image upload response:", imageRes);
      }
      navigate(`/admin/languages/${language}/quarters`);
    }
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
          Quarter
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
              <FormLabel>Quarter</FormLabel>
              <Select
                {...register("id")}
                id="year_id"
                name="id"
                size="md"
                disabled={quarterId ? true : false}
                defaultValue={
                  quarter && quarterId
                    ? quarter.id.split("_")[1]
                    : quartersSelect[0].value
                }
              >
                {quartersSelect.map((quarter) => (
                  <option key={quarter.value} value={quarter.value}>
                    {quarter.label}
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
              <FormLabel>Description</FormLabel>
              <Textarea
                {...register("description")}
                id="description"
                name="description"
                size="md"
              ></Textarea>
              {errors.description && (
                <Alert>
                  <AlertIcon />
                  {errors.description.message}
                </Alert>
              )}
            </FormControl>
            <FormControl>
              <FormLabel>Human Date</FormLabel>
              <Input
                {...register("human_date")}
                id="human_date"
                type="text"
                name="human_date"
                size="md"
              />
              {errors.human_date && (
                <Alert>
                  <AlertIcon />
                  {errors.human_date.message}
                </Alert>
              )}
            </FormControl>
            <FormControl>
              <FormLabel>Year</FormLabel>
              <Input
                {...register("year")}
                readOnly={quarterId ? true : false}
                id="year"
                type="text"
                name="year"
                size="md"
              />
              {errors.year && (
                <Alert>
                  <AlertIcon />
                  {errors.year.message}
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
            <FormControl>
              <FormLabel>Primary Color</FormLabel>
              <Input
                {...register("color_primary")}
                id="color_primary"
                type="text"
                name="color_primary"
                size="md"
              />
              {errors.color_primary && (
                <Alert>
                  <AlertIcon />
                  {errors.color_primary.message}
                </Alert>
              )}
            </FormControl>
            <FormControl>
              <FormLabel>Dark Primary Color</FormLabel>
              <Input
                {...register("color_primary_dark")}
                id="color_primary_dark"
                type="text"
                name="color_primary_dark"
                size="md"
              />
              {errors.color_primary_dark && (
                <Alert>
                  <AlertIcon />
                  {errors.color_primary_dark.message}
                </Alert>
              )}
            </FormControl>
            <FormControl>
              <FormLabel>Image</FormLabel>
              <Input
                type="file"
                name="image"
                accept="image/jpeg, image/png, image/jpg"
                padding={1}
              />
            </FormControl>

            <Button colorScheme="blue" type="submit">
              {quarterId ? "Update" : "Create"}
            </Button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default QuarterForm;
