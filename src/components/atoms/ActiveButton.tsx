import { Button } from "@chakra-ui/react";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  onClick?: () => void;
  me?: number;
  disabled?: boolean;
};

export const ActiveButton = (props: Props) => {
  const { onClick, children, me, disabled } = props;
  return (
    <Button colorScheme="teal" variant="outline" onClick={onClick} me={me} disabled={disabled}>
      {children}
    </Button>
  );
};
