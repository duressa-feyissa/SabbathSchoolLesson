import { Button } from "@chakra-ui/react";
import { logout } from "../services/authService";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <Button
      variant="outline"
      colorScheme="green"
      size={{ base: "sm", md: "md" }}
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
};

export default Logout;
