import {
  Box,
  Button,
  Center,
  Heading,
  Icon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { MdErrorOutline } from "react-icons/md"; // Make sure to install 'react-icons' if not already

const ErrorPage = () => {
  const bgColor = useColorModeValue("gray.100", "gray.900");
  const color = useColorModeValue("gray.800", "white");
  const buttonBgColor = useColorModeValue("purple.500", "purple.300");

  return (
    <Center
      height="100vh"
      width="100%"
      bg={bgColor}
      color={color}
      transition="all 0.5s ease"
    >
      <Box textAlign="center" p={8} rounded="lg" shadow="2xl" borderWidth="1px">
        <Icon
          as={MdErrorOutline}
          w={10}
          h={10}
          mb={4}
          color={useColorModeValue("red.500", "red.300")}
        />
        <Heading mb={4}>Oops! Something Went Wrong</Heading>
        <Text fontSize="lg" mb={8}>
          We're having trouble loading the page you requested. Please try
          reloading the page.
        </Text>
        <Button
          backgroundColor={buttonBgColor}
          color="white"
          _hover={{
            bg: useColorModeValue("purple.600", "purple.400"),
          }}
          size="lg"
          onClick={() => window.location.reload()}
        >
          Try Again
        </Button>
      </Box>
    </Center>
  );
};

export default ErrorPage;
