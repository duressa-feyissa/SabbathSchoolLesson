import {
  Box,
  Text,
  HStack,
  VStack,
  Button,
  useColorMode,
} from "@chakra-ui/react";

import useAuth from "../hooks/useAuth";
import { useLangQueryStore } from "../store";
import { FaCalendarDay } from "react-icons/fa";
import useCurrentQuarter from "../hooks/useCurrentQuarter";
import useCurrentLesson from "../hooks/useCurrentLesson";
import { MdLanguage, MdPlayLesson } from "react-icons/md";
import { BiSolidCircleThreeQuarter } from "react-icons/bi";
import { Link } from "react-router-dom";
const manage = ["Languages", "Quarters", "Lessons", "Days"];
const MenuBar = () => {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === "dark";
  const language = useLangQueryStore((state) => state.language);
  const currUser = useAuth();
  const color = isDarkMode ? "green.100" : "green.900";

  const { data: currentQuarter } = useCurrentQuarter();
  const { data: currentLesson } = useCurrentLesson();

  const getDayId = () => `0${new Date().getDay() + 1}`;
  const lessonlink = `/${language}/quarters/${
    currentQuarter ? currentQuarter.id : "quarterId"
  }/lessons/${currentLesson?.id}`;
  const daylink = lessonlink + `/days/${getDayId()}`;

  const adminLinks = [
    `/admin/languages`,
    `/admin/languages/${language}/quarters`,
    lessonlink,
    daylink,
  ];

  const userLinks = [`/languages`, `${language}/quarters`, lessonlink, daylink];

  const links = currUser?.role === "admin" ? adminLinks : userLinks;

  const Icons = [
    <MdLanguage style={{ with: "40px", height: "40px", color: "#fbad5c" }} />,
    <BiSolidCircleThreeQuarter
      style={{ with: "40px", height: "40px", color: "#fbad5c" }}
    />,
    <MdPlayLesson style={{ with: "40px", height: "40px", color: "#fbad5c" }} />,
    <FaCalendarDay
      style={{ with: "40px", height: "40px", color: "#fbad5c" }}
    />,
  ];
  return (
    <Box mt={"30px"}>
      <Box margin={"10px"}>
        <VStack spacing="16px" align="stretch">
          {manage.map((task, index) => (
            <Link to={links[index]} key={index}>
              <Button
                key={index}
                variant="ghost"
                justifyContent="flex-start"
                borderRadius={8}
              >
                <HStack paddingY="5px">
                  {Icons[index]}
                  <Text
                    whiteSpace="normal"
                    ml="7px"
                    fontSize="lg"
                    color={color}
                  >
                    {task}
                  </Text>
                </HStack>
              </Button>
            </Link>
          ))}
        </VStack>
      </Box>
    </Box>
  );
};

export default MenuBar;
