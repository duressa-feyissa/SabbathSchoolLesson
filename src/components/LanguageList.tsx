import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon, AddIcon } from "@chakra-ui/icons";

const languages = [
  { name: "English", code: "en" },
  { name: "Spanish", code: "es" },
  { name: "French", code: "fr" },
  { name: "German", code: "de" },
];

const LanguageList = () => {
  return (
    <Box padding={4} borderRadius="md" boxShadow="md" width={"90%"}>
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
                    onClick={() => console.log("Delete", language)}
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

export default LanguageList;
