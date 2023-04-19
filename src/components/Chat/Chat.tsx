/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-confusing-arrow */
/* eslint-disable react/function-component-definition */

import { Flex } from "@chakra-ui/react";
import { Deal, Worker } from "@prisma/client";
import { useAddress } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import useChat from "@/hooks/useChat";

import DealStatus from "../DealStatus";

import Divider from "./Divider";
import Footer from "./Footer";
import Header from "./Header";
import Messages, { Message } from "./Messages";

type Props = {
  deal: Deal & {
    workers: Worker[];
  };
};
const Chat: React.FC<Props> = ({ deal }) => {
  const router = useRouter();
  const address = useAddress();
  const [isFettching, setIsFettching] = useState(false);
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
    try {
      setIsFettching(true);
      const result = await fetchChatConversationOfTwo(
        address?.toLowerCase() === deal.ownerAddress.toLowerCase()
          ? (router.query.workerAddress as string)
          : deal.ownerAddress,
        "latest"
      );

      // @ts-ignore
      if (result?.[0]?.timestamp > messages[messages.length - 1].timestamp) {
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
    } catch (e) {
      console.error(e);
    } finally {
      setIsFettching(false);
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
        } else {
          conversionHistory = await fetchChatConversationOfTwo(
            deal.ownerAddress,
            "history"
          );
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
  }, [address]);

  return (
    <Flex w="100%" h="80vh" justify="center" align="center" minW="380px">
      <Flex w="70%" h="90%" flexDir="column">
        <Header
          deal={deal}
          name={
            address?.toLowerCase() === deal.ownerAddress.toLowerCase()
              ? (router.query.workerAddress as string)
              : deal.ownerAddress
          }
        />
        <Divider />
        <Messages
          name={
            address?.toLowerCase() === deal.ownerAddress.toLowerCase()
              ? (router.query.workerAddress as string)
              : deal.ownerAddress
          }
          messages={messages}
        />
        <Divider />
        <Footer
          isFettching={isFettching}
          fetchNewConversion={fetchNewConversion}
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
          handleSendMessage={handleSendMessage}
        />
        <DealStatus deal={deal} />
      </Flex>
    </Flex>
  );
};

export default Chat;
