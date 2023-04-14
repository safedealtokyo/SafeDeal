/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-confusing-arrow */
/* eslint-disable react/function-component-definition */
import { Button, Flex } from "@chakra-ui/react";
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

  const fetchTargetAddress = () =>
    address?.toLowerCase() === deal.ownerAddress.toLowerCase()
      ? (router.query.workerAddress as string)
      : deal.ownerAddress;

  const handleSendMessage = async () => {
    if (!inputMessage.trim().length) {
      return;
    }
    const data = inputMessage;

    await sendChatMessage(data, fetchTargetAddress());

    setMessages((old) => [
      ...old,
      {
        from: address!,
        text: data,
        timestamp: new Date().getTime(),
      },
    ]);
    setInputMessage("");
  };

  // TODO ポーリング
  const fetchNewConversion = async () => {
    const result = await fetchChatConversationOfTwo(
      address?.toLowerCase() === deal.ownerAddress.toLowerCase()
        ? (router.query.workerAddress as string)
        : deal.ownerAddress,
      "latest"
    );
    // @ts-ignore
    if (result?.[0]?.timestamp > messages[messages.length - 1].timestamp) {
      console.log("latest", result);
      if (result) {
        setMessages((old) => [
          ...old,
          {
            from: result[0].fromDID.replace("eip155:", ""),
            text: result[0].messageContent,
            timestamp: result[0].timestamp,
          },
        ]);
      }
    }
  };

  useEffect(() => {
    if (deal.ownerAddress && address) {
      // setInterval(fetchNewConversion, 5000);
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
          const mes: Message[] = conversionHistory
            .sort((a, b) => (a.timestamp ?? 0) - (b?.timestamp ?? 0))
            .map((message) => ({
              text: message.messageContent,
              from: message.fromDID.replace("eip155:", ""),
              timestamp: message.timestamp,
            }));
          setMessages(mes);
        }
      };
      fetch();
    }
  }, []);

  return (
    <Flex w="100%" h="80vh" justify="center" align="center" minW="380px">
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
        <Button onClick={fetchNewConversion}>Fetch</Button>
      </Flex>
    </Flex>
  );
};

export default Chat;
