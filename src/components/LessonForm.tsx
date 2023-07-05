import { useState, ChangeEvent, FormEvent } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
} from "@chakra-ui/react";

const lessons = [
  { id: "01", name: "Lesson 1" },
  { id: "02", name: "Lesson 2" },
  { id: "03", name: "Lesson 3" },
  { id: "04", name: "Lesson 4" },
  { id: "05", name: "Lesson 5" },
  { id: "06", name: "Lesson 6" },
  { id: "07", name: "Lesson 7" },
  { id: "08", name: "Lesson 8" },
  { id: "09", name: "Lesson 9" },
  { id: "10", name: "Lesson 10" },
  { id: "11", name: "Lesson 11" },
  { id: "12", name: "Lesson 12" },
  { id: "13", name: "Lesson 13" },
  { id: "14", name: "Lesson 14" },
];

const LessonForm = () => {
  const [eventData, setEventData] = useState({
    title: "",
    memorial_script: "",
    start_date: "",
    end_date: "",
    index: "",
    id: "",
    cover: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("File uploaded:", file);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(eventData);
  };

  return (
    <Box w={{ base: "100%", lg: "60%" }}>
      <Box p={6}>
        <Heading mb={4} textAlign={"center"}>
          Lesson
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
              <FormLabel>Lesson</FormLabel>
              <Select variant="outline">
                {lessons?.map((lesson) => (
                  <option key={lesson.id} value={lesson.id}>
                    {lesson.name}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Memorial Script</FormLabel>
              <Input
                type="text"
                name="human_date"
                value={eventData.memorial_script}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Start Date</FormLabel>
              <Input
                type="date"
                name="start_date"
                value={eventData.start_date}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>End Date</FormLabel>
              <Input
                type="date"
                name="end_date"
                value={eventData.end_date}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Image</FormLabel>
              <Input
                type="file"
                name="image"
                accept="image/jpeg, image/png, image/jpg"
                onChange={handleImageUpload}
                padding={1}
              />
            </FormControl>

            <Button colorScheme="blue" type="submit">
              Add
            </Button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default LessonForm;
