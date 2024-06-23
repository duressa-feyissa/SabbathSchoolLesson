import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useRef } from "react";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useQuarterQueryStore } from "../store";

const SearchInput = () => {
  const ref = useRef<HTMLInputElement>(null);
  const setSearchText = useQuarterQueryStore((state) => state.setSearchText);
  const navigate = useNavigate();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSearchText(ref.current?.value || "");
        navigate("/");
      }}
    >
      <InputGroup marginX={{ sm: "3" }} maxW={{ sm: "350px" }}>
        <InputLeftElement
          pointerEvents="none"
          children={<BsSearch color="gray.500" />}
        />
        <Input
          ref={ref}
          borderRadius={10}
          name="search"
          placeholder="Search quarters"
          variant="outline"
          backgroundColor="rgba(255, 255, 255, 0.2)"
          _placeholder={{ color: "gray.400" }}
          _hover={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
          _focus={{
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            borderColor: "teal.400",
            boxShadow: "0 0 0 1px teal.400",
          }}
          onChange={(e) => {
            if (e.currentTarget.value === "") setSearchText("");
          }}
        />
      </InputGroup>
    </form>
  );
};

export default SearchInput;
