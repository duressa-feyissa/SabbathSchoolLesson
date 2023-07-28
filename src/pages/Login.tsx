import { Box, Button, Heading, VStack } from "@chakra-ui/react";
import LoginForm from "../components/Login";
import LoginAnimation from "../components/LoginAnimation";
import background from "../assets/main.jpg";
import { AiOutlineArrowRight } from "react-icons/ai";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";

const Login = () => {
  const user = useAuth();
  if (user?.role === "admin") {
    window.location.href = "/admin";
  }

  return (
    <Box
      display={"flex"}
      height={"100vh"}
      alignItems={"center"}
      bgImage={`url(${background})`}
      bgSize="cover"
      bgPosition="center"
    >
      <Box
        display={{ base: "none", lg: "flex", xl: "flex" }}
        width={{ base: "0%", lg: "50%", xl: "50%" }}
        w={"50%"}
        justifyContent={"center"}
        alignItems="center"
      >
        <VStack align={"flex-start"} width={"300px"}>
          <Heading fontSize="3rem" whiteSpace="nowrap" color={"white"}>
            Hi there!
          </Heading>
          <Box width={"500px"}>
            <LoginAnimation />
          </Box>
          <Link to="/">
            <Button
            color={"#ffb400"}
              className={"secondary-button"}
              leftIcon={<AiOutlineArrowRight />}
            >
              Get Started
            </Button>
          </Link>
        </VStack>
      </Box>
      <Box
        display={"flex"}
        width={{ base: "100%", lg: "50%", xl: "50%" }}
        justifyContent={{ base: "center", lg: "flex-start", xl: "flex-start" }}
      >
        <LoginForm />
      </Box>
    </Box>
  );
};

export default Login;
