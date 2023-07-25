import { useState } from "react";
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Spinner,
  useToast,
  useColorMode,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon, AddIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useLanguages from "../hooks/useLanguages";
import Language from "../entities/Language";
import Icon from "./Icon";
import useChangeLanguage from "../hooks/useChangeLanguage";
import { useLangQueryStore, useQuarterQueryStore } from "../store";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";
import APIClient from "../services/apiClinetAPI";

const LanguageList = () => {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === "dark";
  const color = isDarkMode ? "green.100" : "green.900";
  const toast = useToast();
  const selectedLanguage = useLangQueryStore((state) => state.language);
  const setLanguage = useChangeLanguage();
  const currUser = useAuth();
  const setSearchText = useQuarterQueryStore((state) => state.setSearchText);
  const { data, isLoading, refetch } = useLanguages();
  const [deleteConfirmation, setDeleteConfirmation] = useState<string | null>(
    null
  );
  if (isLoading) return <Spinner alignSelf={"center"} />;

  const languages = Array.isArray(data) ? [...data] : [];
  if (languages.length === 0) refetch();

  const handleDeleteConfirmation = (languageId: string) => {
    setDeleteConfirmation(languageId);
  };

  const handleDeleteLanguage = async (languageId: string) => {
    const apiClient = new APIClient<Language>(`/v1/`);
    let toastProps: {
      title: string;
      description: string;
      status: "error" | "success";
    };

    try {
      const res = await apiClient.delete(languageId);

      if (res.status !== 200) {
        toastProps = {
          title: "Failed",
          description: "Language failed to be deleted!",
          status: "error",
        };
      } else {
        toastProps = {
          title: "Success",
          description: "Language is successfully deleted!",
          status: "success",
        };
        refetch();
      }

      toast({
        title: toastProps.title,
        position: "bottom-right",
        colorScheme: "blue",
        description: toastProps.description,
        status: toastProps.status,
        duration: 2000,
      });
    } catch (error) {
      toastProps = {
        title: "Failed",
        description: "An error occurred. Please try again later.",
        status: "error",
      };
      toast(toastProps);
    }

    setDeleteConfirmation(null);
  };

  return (
    <Box padding={4} borderRadius="md" boxShadow="md" width={"90%"}>
      <Box
        display="flex"
        justifyContent={currUser?.role === "admin" ? "space-between" : "center"}
        alignItems="center"
      >
        <Heading size={"2xl"} marginY={"5"} textAlign={"center"} color={color}>
          Languages
        </Heading>
        {currUser?.role === "admin" && (
          <Link to="/admin/languages/add">
            <Icon colorScheme="teal" icon={<AddIcon />} />
          </Link>
        )}
      </Box>
      {languages.length !== 0 ? (
        <Table size="md">
          <Thead>
            <Tr>
              <Th color={color}>Name</Th>
              <Th color={color}>Code</Th>
              {currUser?.role === "admin" && <Td></Td>}
              {currUser?.role === "admin" && <Td></Td>}
            </Tr>
          </Thead>
          <Tbody>
            {languages.map((language: Language, index: number) => (
              <Tr key={index}>
                <Td color={color}>{language.name}</Td>
                <Td>
                  <Badge
                    colorScheme={
                      selectedLanguage === language.code ? "green" : "blue"
                    }
                    fontSize="23px"
                    p={"7px"}
                    borderRadius="4px"
                    onClick={() => {
                      setLanguage(language.code);
                      setSearchText("");
                    }}
                  >
                    {language.code}
                  </Badge>
                </Td>
                {currUser?.role === "admin" && (
                  <Td>
                    <Link to={`/admin/languages/${language.code}/edit`}>
                      <Icon colorScheme="blue" icon={EditIcon} />
                    </Link>
                  </Td>
                )}
                {currUser?.role === "admin" && (
                  <Td>
                    <DeleteIcon
                      color="red.500"
                      cursor="pointer"
                      onClick={() => handleDeleteConfirmation(language.code)}
                    />
                  </Td>
                )}
              </Tr>
            ))}
          </Tbody>
        </Table>
      ) : (
        <Spinner alignSelf={"center"} />
      )}

      {deleteConfirmation && (
        <DeleteConfirmationDialog
          isOpen={true}
          onCancel={() => setDeleteConfirmation(null)}
          onDelete={() => handleDeleteLanguage(deleteConfirmation)}
        />
      )}
    </Box>
  );
};

export default LanguageList;
