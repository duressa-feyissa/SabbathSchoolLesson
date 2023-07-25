import { IconButton } from "@chakra-ui/react";
import { EditIcon, DeleteIcon, AddIcon } from "@chakra-ui/icons";

interface Props {
  colorScheme: string;
  icon: unknown;
}

const Icon = ({ colorScheme, icon }: Props) => {
  const SelectedIcon =
    icon === EditIcon ? EditIcon : icon === DeleteIcon ? DeleteIcon : AddIcon;
  return (
    <IconButton
      colorScheme={colorScheme}
      aria-label={'icon'}
      icon={<SelectedIcon />}
      size="sm"
      variant={"outline"}
    />
  );
};

export default Icon;
