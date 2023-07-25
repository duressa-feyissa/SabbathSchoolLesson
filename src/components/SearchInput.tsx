import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";
import { useQuarterQueryStore } from "../store";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

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
      style={{ width: "100%" }}
    >
      <InputGroup marginX={{ sm: "3" }} width={"98%"}>
        <InputLeftElement children={<BsSearch />} />
        <Input
          ref={ref}
          borderRadius={10}
          name="search"
          placeholder="Search quarters by title and year"
          variant={"filled"}
          onChange={(e) => {
            if (e.currentTarget.value === "") setSearchText("");
          }}
        />
      </InputGroup>
    </form>
  );
};

export default SearchInput;
