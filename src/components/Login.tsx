import { useState } from "react";
import {
  Flex,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Image,
  FormControl,
  InputRightElement,
  VStack,
  HStack,
  useToast,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
import logo from "../images/logo.jpg";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FieldValues } from "react-hook-form";
import APIClient from "../services/apiClinetAPI";
import User from "../entities/user";
import { loginWithJwt } from "../services/authService";
import { useNavigate } from "react-router-dom";

const Schema = z.object({
  email: z.string().nonempty("Email is required"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(6, { message: "Atleast 6 character is required!" }),
});

type FormData = z.infer<typeof Schema>;

const App = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<FormData>({
    resolver: zodResolver(Schema),
  });
  const toast = useToast();
  const navigate = useNavigate();

  const handleShowClick = async () => setShowPassword(!showPassword);
  const onSubmit = async (data: FieldValues) => {
    const apiClient = new APIClient<User>(`/v2/auth`);
    const sendData = {
      email: data["email"],
      password: data["password"],
    };
    const res = await apiClient.post(sendData);
    if (res.status == 200) {
      loginWithJwt(res.data.toString());
      navigate(`/`);
      window.location.reload();
    } else {
      toast({
        title: "Failed",
        position: "bottom-right",
        colorScheme: "blue",
        description: res.data.toString(),
        status: "success",
        duration: 2000,
      });
    }
  };
  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
        spacing={"4"}
      >
        <Image
          src={logo}
          alt="logo"
          objectFit="cover"
          width="70px"
          height="60px"
          borderRadius={3}
        />
        <VStack minW={{ base: "90%", md: "468px" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={8} p="1rem" boxShadow="md">
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input
                    type="text"
                    {...register("email")}
                    id="email"
                    name="email"
                    placeholder="email address"
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    {...register("password")}
                    id="password"
                    name="password"
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <HStack display={"flex"} justifyContent={"center"}>
                <Button
                  borderRadius={15}
                  type="submit"
                  variant="solid"
                  colorScheme="teal"
                  width="90%"
                  color={"gray.100"}
                  isDisabled={!isValid}
                  fontSize={"23"}
                  textShadow={"-moz-initial"}
                >
                  Login
                </Button>
              </HStack>
            </Stack>
          </form>
        </VStack>
      </Stack>
    </Flex>
  );
};

export default App;
