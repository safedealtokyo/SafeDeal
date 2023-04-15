import { Link, Text, useColorModeValue } from "@chakra-ui/react";

export default function Logo() {
  return (
    <Link href="/">
      <Text
        textAlign={{ base: "center", md: "left" }}
        color={useColorModeValue("gray.800", "white")}
        fontWeight="bold"
        fontSize="2xl"
        textDecoration="none"
      >
        SafeDeal
      </Text>
    </Link>
  );
}
