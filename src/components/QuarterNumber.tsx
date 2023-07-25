import { Badge } from "@chakra-ui/react";

interface Props {
  quarter: string;
  colorSchema?: string;
}

const QuarterNumber = ({ quarter, colorSchema = "green" }: Props) => {
  return (
    <Badge colorScheme={colorSchema} fontSize="23px" borderRadius="4px">
      {quarter}
    </Badge>
  );
};

export default QuarterNumber;
