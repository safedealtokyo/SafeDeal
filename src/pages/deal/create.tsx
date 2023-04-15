import { Box, Center, Heading, VStack } from "@chakra-ui/react";

import DealCollectionForm from "@/components/DealCollectionForm";
import Navbar from "@/components/Navbar";

export default function Protected() {
  return (
    <Box>
      <Navbar />
      <Center>
        <VStack>
          <Heading>Deal作成ページ</Heading>
          <DealCollectionForm />
        </VStack>
      </Center>
    </Box>
  );
}
