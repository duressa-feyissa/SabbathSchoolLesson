import { DeleteIcon } from "@chakra-ui/icons";
import { useToast } from "@chakra-ui/react";
import { useState } from "react";
import APIClient from "../services/apiClinetAPI";
import { useLangQueryStore } from "../store";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";
import { useParams } from "react-router-dom";
import Day from "../entities/day";

interface Props {
  refetch?: () => void;
  dayId: string;
}

const DeleteDay = ({ refetch, dayId }: Props) => {
  const [deleteConfirmation, setDeleteConfirmation] = useState<string | null>(
    null
  );
  const { quarterId, lessonId } = useParams<{
    quarterId: string;
    lessonId: string;
  }>();
  const language = useLangQueryStore((state) => state.language);
  const toast = useToast();

  const handleDeleteConfirmation = (dayId: string) => {
    setDeleteConfirmation(dayId);
  };

  const handleDeleteLanguage = async (lessonDeleted: string) => {
    const apiClient = new APIClient<Day>(
      `/v1/${language}/quarters/${quarterId}/lessons/${lessonId}/days`
    );
    let toastProps: {
      title: string;
      description: string;
      status: "error" | "success";
    };

    try {
      const res = await apiClient.delete(lessonDeleted);

      if (res.status !== 200) {
        toastProps = {
          title: "Failed",
          description: "Day failed to be deleted!",
          status: "error",
        };
      } else {
        toastProps = {
          title: "Success",
          description: "Day is successfully deleted!",
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
        onClick={() => handleDeleteConfirmation(dayId)}
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

export default DeleteDay;
