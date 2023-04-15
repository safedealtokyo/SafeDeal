import { Text, useColorModeValue } from "@chakra-ui/react";

export default function Logo() {
  return (
    <Text
      textAlign={{ base: "center", md: "left" }}
      color={useColorModeValue("gray.800", "white")}
      fontWeight="bold"
      fontSize="2xl"
    >
      SafeDeal
    </Text>
  );
}
