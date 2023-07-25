import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
} from "@chakra-ui/react";
import React, { useRef } from "react";

interface DeleteConfirmationDialogProps {
  isOpen: boolean;
  onCancel: () => void;
  onDelete: () => void;
}

const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({
  isOpen,
  onCancel,
  onDelete,
}) => {
  const leastDestructiveRef = useRef<HTMLButtonElement | null>(null);

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={leastDestructiveRef}
      onClose={onCancel}
    >
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader>Delete Language</AlertDialogHeader>
        <AlertDialogBody>
          Are you sure you want to delete this language?
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button
            onClick={onDelete}
            colorScheme="red"
            mr={3}
            ref={leastDestructiveRef}
          >
            Delete
          </Button>
          <Button onClick={onCancel}>Cancel</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteConfirmationDialog;
