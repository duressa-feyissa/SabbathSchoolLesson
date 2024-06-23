import { Box, Flex, useColorMode } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

const Layout = () => {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === "dark";

  const bodyColor = isDarkMode ? "#252525" : "gray.50";
  return (
    <Box>
      <NavBar />
      <Box
        bg={bodyColor}
        margin={"0 auto"}
        padding={"20px 0"}
        display={"flex"}
        flexDirection={"column"}
      >
        <Flex maxWidth="1440px" direction="column" margin="0 auto" p={4}>
          <Outlet />
        </Flex>
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
