import { useEffect } from "react";
import { useToast } from "@chakra-ui/react";

interface ToastProps {
  title: string;
  description: string;
  status: "success" | "error" | "warning" | "info" | "loading";
}

const Toast = ({ title, description, status }: ToastProps) => {
  const toast = useToast();

  useEffect(() => {
    toast({
      title: title,
      description: description,
      status: status,
      duration: 3000,
      isClosable: true,
    });
  }, [toast, title, description, status]);

  return null;
};

export default Toast;
