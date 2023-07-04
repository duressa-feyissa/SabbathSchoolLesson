import React, { useState } from "react";
import {
  Box,
  Container,
  Heading,
  Input,
  Button,
  Stack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon, AddIcon } from "@chakra-ui/icons";

interface Language {
  name: string;
  code: string;
}

const AddLanguage: React.FC<{
  onAddLanguage: (language: Language) => void;
}> = ({ onAddLanguage }) => {
  const [newLanguage, setNewLanguage] = useState<Language>({
    name: "",
    code: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewLanguage((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAddLanguage(newLanguage);
    setNewLanguage({ name: "", code: "" });
  };

  return (
    <Box padding={4} borderRadius="md" boxShadow="md">
      <Box display={"flex"}>
        <Heading mb={"7"}>Language</Heading>
      </Box>
      <form onSubmit={handleSubmit}>
        <Stack spacing={7}>
          <Input
            type="text"
            id="name"
            name="name"
            value={newLanguage.name}
            onChange={handleInputChange}
            placeholder="Language Name"
            size="md"
          />
          <Input
            type="text"
            id="code"
            name="code"
            value={newLanguage.code}
            onChange={handleInputChange}
            placeholder="Code"
            size="md"
          />
          <Button colorScheme="blue" type="submit" size="md">
            Add Language
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

const LanguageList: React.FC<{
  languages: Language[];
  onDeleteLanguage: (index: number) => void;
}> = ({ languages, onDeleteLanguage }) => {
  return (
    <Box padding={4} borderRadius="md" boxShadow="md">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Heading size="lg">Languages</Heading>
        <IconButton
          colorScheme="teal"
          aria-label="Add Language"
          icon={<AddIcon />}
          onClick={() => console.log("Add")}
          size="sm"
          variant={"outline"}
        />
      </Box>
      {languages.length !== 0 ? (
        <Table size="md">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Code</Th>
              <Th></Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {languages.map((language, index) => (
              <Tr key={index}>
                <Td>{language.name}</Td>
                <Td>{language.code}</Td>
                <Td>
                  <IconButton
                    colorScheme="blue"
                    aria-label="Edit Language"
                    icon={<EditIcon />}
                    onClick={() => console.log("Edit", language)}
                    size="sm"
                  />
                </Td>
                <Td>
                  <IconButton
                    colorScheme="red"
                    aria-label="Delete Language"
                    icon={<DeleteIcon />}
                    onClick={() => onDeleteLanguage(index)}
                    size="sm"
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      ) : (
        <Box mt={4}>No languages available.</Box>
      )}
    </Box>
  );
};

const Language: React.FC = () => {
  const [languages, setLanguages] = useState<Language[]>([]);

  const handleAddLanguage = (language: Language) => {
    setLanguages((prevState) => [...prevState, language]);
  };

  const handleDeleteLanguage = (index: number) => {
    setLanguages((prevState) => prevState.filter((_, i) => i !== index));
  };

  return (
    <Container maxWidth="100%" paddingY={8}>
      <Stack direction={["column", "column", "row"]} spacing={8}>
        <Stack width={["100%", "100%", "50%"]} spacing={4}>
          <AddLanguage onAddLanguage={handleAddLanguage} />
        </Stack>
        <Stack width={["100%", "100%", "50%"]} spacing={4}>
          <LanguageList
            languages={languages}
            onDeleteLanguage={handleDeleteLanguage}
          />
        </Stack>
      </Stack>
    </Container>
  );
};

export default Language;
