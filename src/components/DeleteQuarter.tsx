import { DeleteIcon } from "@chakra-ui/icons";
import { useToast } from "@chakra-ui/react";
import { useState } from "react";
import APIClient from "../services/apiClinetAPI";
import { useLangQueryStore } from "../store";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";
import Quarter from "../entities/Quarter";

interface Props {
  refetch?: () => void;
  quarterId: string;
}

const DeleteQuarter = ({ refetch, quarterId }: Props) => {
  const [deleteConfirmation, setDeleteConfirmation] = useState<string | null>(
    null
  );
  const language = useLangQueryStore((state) => state.language);
  const toast = useToast();

  const handleDeleteConfirmation = (languageId: string) => {
    setDeleteConfirmation(languageId);
  };

  const handleDeleteLanguage = async (quarterDeleted: string) => {
    const apiClient = new APIClient<Quarter>(`/v1/${language}/quarters`);
    let toastProps: {
      title: string;
      description: string;
      status: "error" | "success";
    };

    try {
      const res = await apiClient.delete(quarterDeleted);

      if (res.status !== 200) {
        toastProps = {
          title: "Failed",
          description: "Quarter failed to be deleted!",
          status: "error",
        };
      } else {
        toastProps = {
          title: "Success",
          description: "Quarter is successfully deleted!",
          status: "success",
        };
        if (refetch) refetch();
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
    <>
      <DeleteIcon
        color="red.500"
        cursor="pointer"
        onClick={() => handleDeleteConfirmation(quarterId)}
      />
      {deleteConfirmation && (
        <DeleteConfirmationDialog
          isOpen={true}
          onCancel={() => setDeleteConfirmation(null)}
          onDelete={() => handleDeleteLanguage(deleteConfirmation)}
        />
      )}
    </>
  );
};

export default DeleteQuarter;
