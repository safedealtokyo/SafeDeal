import { Flex, Text } from "@chakra-ui/react";
import { useAddress } from "@thirdweb-dev/react";
import React from "react";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";

export type Message = {
  text: string;
  from: string;
  timestamp?: number;
};
type Props = {
  name: string;
  messages: Message[];
};
function Messages({ name, messages }: Props) {
  const address = useAddress();
  return (
    <Flex w="100%" h="80%" overflowY="scroll" flexDirection="column" p="3">
      {messages.map((item, index) => {
        if (item.from === address) {
          return (
            <Flex key={index} w="100%" justify="flex-end">
              <Flex
                borderRadius="15px"
                bg="black"
                color="white"
                minW="100px"
                maxW="350px"
                my="1"
                p="3"
              >
                <Text>{item.text}</Text>
              </Flex>
            </Flex>
          );
        }
        return (
          <Flex key={index} w="100%">
            <Jazzicon diameter={30} seed={jsNumberForAddress(name)} />
            <Flex
              borderRadius="15px"
              bg="gray.100"
              color="black"
              minW="100px"
              maxW="350px"
              my="1"
              p="3"
            >
              <Text>{item.text}</Text>
            </Flex>
          </Flex>
        );
      })}
    </Flex>
  );
}

export default Messages;
