import { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import useLanguage from "../hooks/useLanguage";
import APIClient from "../services/apiClinetAPI";
import Language from "../entities/Language";

const schema = z.object({
  name: z.string().min(4, { message: "Name must be at least 4 characters" }),
  code: z
    .string()
    .min(2, { message: "Code must be at least 2 characters" })
    .max(4, { message: "Code must be at most 4 characters" }),
});

type FormData = z.infer<typeof schema>;

const LanguageForm = () => {
  const navigate = useNavigate();
  const { lang } = useParams<{ lang: string }>() || "";
  const { data: language, isLoading } = useLanguage(lang || "");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isValid, errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (language) {
      setValue("name", language.name);
      setValue("code", language.code);
    }
  }, [language, setValue]);

  const toast = useToast();

  const onSubmit = async (data: FieldValues) => {
    const apiClient = new APIClient<Language>(`/v1/`);
    const sendData = { name: data["name"], code: data["code"] };
    let toastProps: {
      title: string;
      description: string;
      status: "error" | "success";
    };

    let res;
    if (lang) {
      res = await apiClient.put(lang, sendData);
    } else {
      res = await apiClient.post(sendData);
    }
    // eslint-disable-next-line prefer-const
    toastProps = {
      title: res.status === 200 || res.status === 201 ? "Success" : "Failed",
      description:
        res.status === 200 || res.status === 201
          ? lang
            ? "Language is successfully updated!"
            : "Language is successfully created!"
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

    if (res.status === 200 || res.status === 201) {
      navigate("/admin/languages");
    }
  };

  return (
    <Box w={{ base: "100%", lg: "60%" }} p={6}>
      <Heading mb={4} textAlign="center">
        Language
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={7}>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              {...register("name")}
              type="text"
              id="name"
              name="name"
              size="md"
            />
            {errors.name && (
              <Alert>
                <AlertIcon />
                {errors.name.message}
              </Alert>
            )}
          </FormControl>
          <FormControl>
            <FormLabel>Code</FormLabel>
            <Input
              {...register("code")}
              type="text"
              id="code"
              name="code"
              readOnly={lang ? true : false}
              size="md"
            />
            {errors.code && (
              <Alert>
                <AlertIcon />
                {errors.code.message}
              </Alert>
            )}
          </FormControl>
          {isLoading ? (
            <Spinner />
          ) : (
            <Button
              disabled={!isValid || isLoading}
              colorScheme="blue"
              type="submit"
              fontSize="20px"
            >
              {lang ? "Update" : "Create"}
            </Button>
          )}
        </Stack>
      </form>
    </Box>
  );
};

export default LanguageForm;
