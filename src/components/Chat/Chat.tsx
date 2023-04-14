/* eslint-disable react/function-component-definition */
import { Flex } from "@chakra-ui/react";
import { Deal } from "@prisma/client";
import { useAddress } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import useChat from "@/hooks/useChat";

import Divider from "./Divider";
import Footer from "./Footer";
import Header from "./Header";
import Messages, { Message } from "./Messages";

type Props = {
  deal: Deal;
};
const Chat: React.FC<Props> = ({ deal }) => {
  const router = useRouter();
  const address = useAddress();
  const { fetchChatConversationOfTwo, sendChatMessage } = useChat();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = async () => {
    if (!inputMessage.trim().length) {
      return;
    }
    const data = inputMessage;

    await sendChatMessage(data, deal.ownerAddress);

    setMessages((old) => [...old, { from: address!, text: data }]);
    setInputMessage("");

    // setTimeout(() => {
    //   setMessages((old) => [...old, { from: "computer", text: data }]);
    // }, 1000);
  };

  useEffect(() => {
    if (deal.ownerAddress && address) {
      const fetch = async () => {
        let conversionHistory;
        if (address.toLowerCase() === deal.ownerAddress.toLowerCase()) {
          conversionHistory = await fetchChatConversationOfTwo(
            router.query.workerAddress as string,
            "history"
          );
          console.log(conversionHistory);
        } else {
          conversionHistory = await fetchChatConversationOfTwo(
            deal.ownerAddress,
            "history"
          );
          console.log(conversionHistory);
        }

        if (conversionHistory) {
          const mes: Message[] = conversionHistory.map((message) => ({
            text: message.messageContent,
            from: message.fromDID.replace("eip155:", ""),
          }));
          setMessages(mes);
        }
      };
      fetch();
    }
  }, []);

  return (
    <Flex w="100%" h="80vh" justify="center" align="center">
      <Flex w={["100%", "100%", "40%"]} h="90%" flexDir="column">
        <Header
          name={
            address?.toLowerCase() === deal.ownerAddress.toLowerCase()
              ? (router.query.workerAddress as string)
              : deal.ownerAddress
          }
        />
        <Divider />
        <Messages messages={messages} />
        <Divider />
        <Footer
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
          handleSendMessage={handleSendMessage}
        />
      </Flex>
    </Flex>
  );
};

export default Chat;
