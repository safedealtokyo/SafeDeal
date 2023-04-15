import { Box, Center, Heading, VStack } from "@chakra-ui/react";

import DealCollectionForm from "@/components/DealCollectionForm";

export default function Protected() {
  return (
    <Box w="100%">
      <Center w="100%" mt={8}>
        <VStack gap="10px" w="100%">
          <Heading pt="40px">Create Deal</Heading>
          <DealCollectionForm />
        </VStack>
      </Center>
    </Box>
  );
}
