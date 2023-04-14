/* eslint-disable import/prefer-default-export */
import { useToast } from "@chakra-ui/react";
import { useCallback } from "react";

export const useToaster = () => {
  const toast = useToast();
  const errorToast = useCallback(
    (message: string) => {
      toast({
        title: message,
        status: "error",
        position: "top",
        duration: 7000,
        isClosable: true
      });
    },
    [toast]
  );

  const successToast = useCallback(
    (message: string) => {
      toast({
        title: message,
        status: "success",
        position: "top",
        duration: 7000,
        isClosable: true
      });
    },
    [toast]
  );

  const infoToast = useCallback(
    (message: string) => {
      toast({
        title: message,
        status: "info",
        position: "top",
        isClosable: true
      });
    },
    [toast]
  );
  return { errorToast, successToast, infoToast };
};
