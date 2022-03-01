import { useToast } from "@chakra-ui/react";
import { useCallback } from "react";

type Props = {
  title: string;
  description: string;
  status: "info" | "warning" | "success" | "error";
  onCloseComplete?: () => void;
};

export const useMessage = () => {
  const toast = useToast();

  const showMessage = useCallback(
    (props: Props) => {
      const { title, description, status, onCloseComplete } = props;
      toast({
        title: title,
        description: description,
        position: "bottom-end",
        status: status,
        isClosable: true,
        duration: 5000,
        onCloseComplete: onCloseComplete
      });
    },
    [toast]
  );

  return { showMessage };
};
