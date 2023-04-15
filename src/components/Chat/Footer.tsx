/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
import { RepeatIcon } from "@chakra-ui/icons";
import { Flex, Input, Button } from "@chakra-ui/react";
import { IMessageIPFS } from "@pushprotocol/restapi";
import { useAddress } from "@thirdweb-dev/react";
import React from "react";

import { Message } from "./Messages";

type Props = {
  inputMessage: string;
  setInputMessage: React.Dispatch<React.SetStateAction<string>>;
  handleSendMessage: () => void;
  fetchNewConversion: () => Promise<void>;
};
function Footer({
  inputMessage,
  setInputMessage,
  handleSendMessage,
  fetchNewConversion,
}: Props) {
  const address = useAddress();
  return (
    <Flex w="100%" mt="5" mb="10px" alignItems="center">
      <Input
        placeholder="Type Something..."
        border="none"
        borderRadius="none"
        _focus={{
          border: "1px solid black",
        }}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            handleSendMessage();
          }
        }}
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
      />
      <RepeatIcon mr="10px" boxSize="6" onClick={fetchNewConversion} />
      <Button
        bg="black"
        color="white"
        _hover={{
          bg: "white",
          color: "black",
          border: "1px solid black",
        }}
        disabled={inputMessage.trim().length <= 0}
        onClick={handleSendMessage}
      >
        Send
      </Button>
    </Flex>
  );
}

export default Footer;
