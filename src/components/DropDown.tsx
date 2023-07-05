import { ChevronDownIcon } from "@chakra-ui/icons";
import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";

interface Props {
  orders: string[];
  label: string;
}

const DropDown = ({ orders, label }: Props) => {
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
          <MenuItem key={index}>{order}</MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default DropDown;
