import { ChevronDownIcon } from "@chakra-ui/icons";
import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { useQuarterQueryStore } from "../store";
interface Props {
  orders: string[];
  label: string;
}

const DropDown = ({ orders, label }: Props) => {
  const setSortOrder = useQuarterQueryStore((state) => state.setSortOrder);

  const handleSort = (order: number) => {
    setSortOrder(order === 0 ? "desc" : "asc");
  };

  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<ChevronDownIcon />}
        variant="outline"
        size="sm"
      >
        {label}
      </MenuButton>
      <MenuList fontSize={{ base: "12px", lg: "18px" }}>
        {orders.map((order, index) => (
          <MenuItem key={index} onClick={() => handleSort(index)}>
            {order}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default DropDown;
