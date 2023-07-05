import { Grid, Show, GridItem } from "@chakra-ui/react";
import Aside from "../components/Aside";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

const Layout = () => {
  return (
    <>
      <Grid
        width={"100%"}
        templateAreas={{
          base: `"main"`,
          lg: `"aside main"`,
        }}
        templateColumns={{ base: "1fr", lg: "225px 1fr" }}
      >
        <Show above="lg">
          <GridItem gridArea="aside">
            <Aside />
          </GridItem>
        </Show>
        <GridItem gridArea="main">
          <NavBar />
          <Outlet />
        </GridItem>
      </Grid>
    </>
  );
};

export default Layout;
