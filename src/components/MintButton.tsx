import { Button } from "@chakra-ui/react";
import axios from "axios";

type Props = {
  contractAddress: string;
  destinationAddress: string;
  buttonLabel: string;
};

export default function MintButton({
  contractAddress,
  destinationAddress,
  buttonLabel,
}: Props) {
  const mint = async () => {
    try {
      const response = await axios.post("/api/deal/mint", {
        contractAddress,
        destinationAddress,
      });
      return response.data;
    } catch (error: any) {
      console.error(`Error creating NFT collection: ${error.toString()}`);
      return null;
    }
  };

  return (
    <Button
      onClick={mint}
      colorScheme="teal"
      as="a"
      display={{ base: "none", md: "inline-flex" }}
      fontSize="sm"
      fontWeight={600}
      color="white"
      bg="pink.400"
      href="#"
      _hover={{
        bg: "pink.300",
      }}
    >
      {buttonLabel}
    </Button>
  );
}
