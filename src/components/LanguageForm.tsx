import { useState, ChangeEvent, FormEvent } from "react";
import {
  Box,
  Heading,
  Input,
  Button,
  Stack,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";

interface Language {
  name: string;
  code: string;
}

const LanguageForm = () => {
  const [newLanguage, setNewLanguage] = useState<Language>({
    name: "",
    code: "",
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setNewLanguage((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setNewLanguage({ name: "", code: "" });
  };

  return (
    <Box w={{ base: "100%", lg: "60%" }}>
      <Box p={6}>
        <Heading mb={4} textAlign={"center"}>
          Language
        </Heading>
        <form onSubmit={handleSubmit}>
          <Stack spacing={7}>
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                id="name"
                name="name"
                value={newLanguage.name}
                onChange={handleInputChange}
                size="md"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Code</FormLabel>
              <Input
                type="text"
                id="code"
                name="code"
                value={newLanguage.code}
                onChange={handleInputChange}
                size="md"
              />
            </FormControl>
            <Button colorScheme="blue" type="submit" size="md">
              Add Language
            </Button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default LanguageForm;
