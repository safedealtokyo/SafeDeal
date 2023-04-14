/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-unstable-nested-components */
import { Avatar, Flex, Text } from "@chakra-ui/react";
import { useAddress } from "@thirdweb-dev/react";
import React, { useEffect, useRef } from "react";

export type Message = {
  text: string;
  from: string;
  timestamp?: number;
};
type Props = {
  messages: Message[];
};
function Messages({ messages }: Props) {
  const address = useAddress();
  //   function AlwaysScrollToBottom() {
  //     const elementRef = useRef();
  //     useEffect(() => elementRef.current.scrollIntoView());
  //     return <div ref={elementRef} />;
  //   }

  return (
    <Flex w="100%" h="80%" overflowY="scroll" flexDirection="column" p="3">
      {messages.map((item, index) => {
        if (item.from === address) {
          return (
            <Flex key={index} w="100%" justify="flex-end">
              <Flex
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
            <Avatar
              name="Computer"
              src="https://avataaars.io/?avatarStyle=Transparent&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light"
              bg="blue.300"
            />
            <Flex
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
      {/* <AlwaysScrollToBottom /> */}
    </Flex>
  );
}

export default Messages;
