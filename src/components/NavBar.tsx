import {
  Box,
  Center,
  Flex,
  HStack,
  Image,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import useChangeLanguage from "../hooks/useChangeLanguage";
import logo from "../images/logo.jpg";
import ColorModeSwitch from "./ColorModeSwitch";

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const setLanguage = useChangeLanguage();

  const isSmallScreen = useBreakpointValue({
    base: true,
    sm: true,
    md: false,
    lg: false,
    xl: false,
  });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const bgColor = useColorModeValue("white", "gray.700");

  const languageOptions = [
    {
      value: "am",
      label: (
        <>
          <span role="img" aria-label="Amharic">
            🇪🇹
          </span>{" "}
          Amharic
        </>
      ),
    },

    {
      value: "en",
      label: (
        <>
          <span role="img" aria-label="English">
            🇺🇸
          </span>{" "}
          English
        </>
      ),
    },
    {
      value: "es",
      label: (
        <>
          <span role="img" aria-label="Spanish">
            🇪🇸
          </span>{" "}
          Spanish
        </>
      ),
    },
    {
      value: "fr",
      label: (
        <>
          <span role="img" aria-label="French">
            🇫🇷
          </span>{" "}
          French
        </>
      ),
    },
    {
      value: "pt",
      label: (
        <>
          <span role="img" aria-label="Portuguese">
            🇵🇹
          </span>{" "}
          Portuguese
        </>
      ),
    },
    {
      value: "ru",
      label: (
        <>
          <span role="img" aria-label="Russian">
            🇷🇺
          </span>{" "}
          Russian
        </>
      ),
    },
    {
      value: "zh",
      label: (
        <>
          <span role="img" aria-label="Chinese">
            🇨🇳
          </span>{" "}
          Chinese
        </>
      ),
    },
  ];

  return (
    <Box
      width="100%"
      bg={isScrolled ? "" : bgColor}
      boxShadow={isScrolled ? "md" : "none"}
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        backdropFilter: isScrolled ? "blur(10px)" : "none",
        WebkitBackdropFilter: isScrolled ? "blur(10px)" : "none",
        transition: "backdrop-filter 0.3s ease-in-out",
      }}
    >
      <Center>
        <Flex
          padding={2}
          alignItems="center"
          justifyContent="space-between"
          align="center"
          maxW="1440px"
          width="100%"
        >
          {/* Left Section */}
          <HStack spacing={3}>
            <Link to="/">
              <HStack>
                <Image
                  src={logo}
                  alt="logo"
                  objectFit="cover"
                  width="35px"
                  height="30px"
                  borderRadius={3}
                />
                <Text
                  align="center"
                  fontWeight="bold"
                  fontSize={isSmallScreen ? "18px" : "22px"}
                  display={isSmallScreen ? "none" : "block"}
                  fontFamily="sans-serif"
                  color={useColorModeValue("#333", "#fbad5c")}
                >
                  Sabbath School
                </Text>
              </HStack>
            </Link>
          </HStack>

          {/* Right Section */}
          <HStack spacing={{ base: 4, md: 6 }}>
            <>
              <Select
                options={languageOptions}
                defaultValue={languageOptions[0]}
                styles={{
                  control: (base, state) => ({
                    ...base,
                    minWidth: 120,
                    backgroundColor: useColorModeValue("white", "gray.700"),
                    color: useColorModeValue("black", "white"),
                    borderColor: state.isFocused
                      ? useColorModeValue("gray.300", "gray.600")
                      : useColorModeValue("gray.200", "gray.700"),
                    boxShadow: state.isFocused
                      ? `0 0 0 1px ${useColorModeValue("gray.300", "gray.600")}`
                      : "none",
                    "&:hover": {
                      borderColor: useColorModeValue("gray.300", "gray.600"),
                    },
                  }),
                  singleValue: (base) => ({
                    ...base,
                    color: useColorModeValue("black", "white"),
                  }),
                  menu: (base) => ({
                    ...base,
                    backgroundColor: useColorModeValue("white", "gray.700"),
                    color: useColorModeValue("black", "white"),
                  }),
                }}
                onChange={(selectedOption) => {
                  setLanguage(selectedOption?.value ?? "am");
                }}
              />
              <ColorModeSwitch />
            </>
          </HStack>
        </Flex>
      </Center>
    </Box>
  );
};

export default NavBar;
