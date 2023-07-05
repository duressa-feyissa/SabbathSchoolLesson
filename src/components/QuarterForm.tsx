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
  Textarea,
} from "@chakra-ui/react";

const quarters = [
  { value: "01", label: "Quarter I" },
  { value: "02", label: "Quarter II" },
  { value: "03", label: "Quarter III" },
  { value: "04", label: "Quarter IV" },
];

const QuarterForm = () => {
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    human_date: "",
    start_date: "",
    end_date: "",
    index: "",
    id: "",
    cover: "",
    color_primary: "",
    color_primary_dark: "",
    introduction: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Perform file upload logic here
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
      <Box p={6} borderRadius="md" boxShadow="md">
        <Heading mb={4} textAlign={"center"}>
          Quarter
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
              <FormLabel>Quarter</FormLabel>
              <Select
                name="quarter"
                value={eventData.id}
                onChange={handleChange}
              >
                {quarters.map((quarter) => (
                  <option key={quarter.value} value={quarter.value}>
                    {quarter.label}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Description</FormLabel>
              <Textarea
                name="description"
                value={eventData.description}
                onChange={handleChange}
              ></Textarea>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Human Date</FormLabel>
              <Input
                type="text"
                name="human_date"
                value={eventData.human_date}
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
              <FormLabel>Primary Color</FormLabel>
              <Input
                type="text"
                name="color_primary"
                value={eventData.color_primary}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Dark Primary Color</FormLabel>
              <Input
                type="text"
                name="color_primary_dark"
                value={eventData.color_primary_dark}
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

export default QuarterForm;
