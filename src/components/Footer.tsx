import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  Link,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <Box
      bg={useColorModeValue("white", "gray.800")}
      color={useColorModeValue("gray.700", "gray.200")}
      py={10}
      mt={10}
    >
      <Container as={Stack} maxW={"1440px"}>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
          <Stack align={"flex-start"}>
            <Heading size="md" mb={4}>
              Company
            </Heading>
            <Link href={"#"}>About Us</Link>
            <Link href={"#"}>Careers</Link>
            <Link href={"#"}>Press</Link>
            <Link href={"#"}>Blog</Link>
          </Stack>

          <Stack align={"flex-start"}>
            <Heading size="md" mb={4}>
              Support
            </Heading>
            <Link href={"#"}>Contact Us</Link>
            <Link href={"#"}>FAQs</Link>
            <Link href={"#"}>Privacy Policy</Link>
            <Link href={"#"}>Terms of Service</Link>
          </Stack>

          <Stack align={"flex-start"}>
            <Heading size="md" mb={4}>
              Follow Us
            </Heading>
            <HStack spacing={6}>
              <Link href={"https://www.facebook.com/"} isExternal>
                <FaFacebook size="24" />
              </Link>
              <Link href={"https://www.twitter.com/"} isExternal>
                <FaTwitter size="24" />
              </Link>
              <Link href={"https://www.instagram.com/"} isExternal>
                <FaInstagram size="24" />
              </Link>
              <Link href={"https://www.linkedin.com/"} isExternal>
                <FaLinkedin size="24" />
              </Link>
            </HStack>
          </Stack>
        </SimpleGrid>

        <Flex
          pt={10}
          direction={{ base: "column", md: "row" }}
          justify={{ base: "center", md: "space-between" }}
          align={{ base: "center", md: "center" }}
        >
          <Text fontSize={"sm"} textAlign={"center"}>
            © {new Date().getFullYear()} Your Company. All rights reserved.
          </Text>
          <HStack spacing={6} mt={{ base: 4, md: 0 }}>
            <Link href={"#"}>Privacy Policy</Link>
            <Link href={"#"}>Terms of Service</Link>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer;
