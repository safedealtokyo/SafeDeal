import { Box, Center, Heading, VStack } from "@chakra-ui/react";

import DealCollectionForm from "@/components/DealCollectionForm";
import Navbar from "@/components/Navbar";

export default function Protected() {
  return (
    <Box>
      <Navbar />
      <Center>
        <VStack gap="10px">
          <Heading>Create Deal</Heading>
          <DealCollectionForm />
        </VStack>
      </Center>
    </Box>
  );
}
