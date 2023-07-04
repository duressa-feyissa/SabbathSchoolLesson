import { useState, ChangeEvent, FormEvent } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  Textarea,
  useBreakpointValue,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";

const days = [
  { id: "01", name: "Sunday" },
  { id: "02", name: "Monday" },
  { id: "03", name: "Tuesday" },
  { id: "04", name: "Wednesday" },
  { id: "05", name: "Thursday" },
  { id: "06", name: "Friday" },
  { id: "07", name: "Saturday" },
];

const DayForm = () => {
  const isSmallScreen = useBreakpointValue({
    base: true,
    sm: true,
    md: false,
    lg: false,
    xl: false,
  });

  const [eventData, setEventData] = useState({
    title: "",
    day: "",
    date: "",
    index: "",
    id: "",
    paragraphs: [""],
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number
  ) => {
    const { name, value } = e.target;
    if (index) {
      const updatedParagraphs = [...eventData.paragraphs];
      updatedParagraphs[index] = value;
      setEventData((prevData) => ({
        ...prevData,
        paragraphs: updatedParagraphs,
      }));
    } else {
      setEventData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleAddParagraph = () => {
    setEventData((prevData) => ({
      ...prevData,
      paragraphs: [...prevData.paragraphs, ""],
    }));
  };

  const handleRemoveParagraph = (index: number) => {
    const updatedParagraphs = [...eventData.paragraphs];
    updatedParagraphs.splice(index, 1);
    setEventData((prevData) => ({
      ...prevData,
      paragraphs: updatedParagraphs,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(eventData);
  };

  return (
    <Container maxWidth="lg" py={8}>
      <Box p={6} borderRadius="md" boxShadow="md">
        <Heading textAlign="center" mb={4}>
          Day
        </Heading>
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Title</FormLabel>
              <Input
                type="text"
                name="title"
                value={eventData.title}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Day of the Week</FormLabel>
              <Select variant="outline" name="dayOfTheWeek">
                {days?.map((day) => (
                  <option key={day.id} value={day.id}>
                    {day.name}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Day</FormLabel>
              <Input
                type="text"
                name="day"
                value={eventData.title}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Date</FormLabel>
              <Input type="date" name="date" value={eventData.date} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Paragraphs</FormLabel>
              {eventData.paragraphs.map((paragraph, index) => (
                <Stack
                  key={index}
                  direction="row"
                  spacing={3}
                  alignItems="center"
                >
                  <Textarea
                    name="paragraphs"
                    marginY={3}
                    resize={"none"}
                    value={paragraph}
                    onChange={(e) => handleChange(e, index)}
                  />
                  {index === eventData.paragraphs.length - 1 && (
                    <Button
                      onClick={handleAddParagraph}
                      size="sm"
                      colorScheme="blue"
                      paddingX={4}
                      leftIcon={<AddIcon />}
                    >
                      {!isSmallScreen ? "Add" : null}
                    </Button>
                  )}
                  {index !== eventData.paragraphs.length - 1 && (
                    <Button
                      onClick={() => handleRemoveParagraph(index)}
                      size="sm"
                      colorScheme="red"
                      paddingX={4}
                      leftIcon={<DeleteIcon />}
                    >
                      {!isSmallScreen ? "Remove" : null}
                    </Button>
                  )}
                </Stack>
              ))}
            </FormControl>
            <Button colorScheme="blue" type="submit">
              Submit
            </Button>
          </Stack>
        </form>
      </Box>
    </Container>
  );
};

export default DayForm;
