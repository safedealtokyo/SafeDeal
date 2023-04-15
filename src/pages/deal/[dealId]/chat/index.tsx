/* eslint-disable react/jsx-one-expression-per-line */
import { Box, Center, HStack, Heading, Text } from "@chakra-ui/react";
import { Deal, Worker } from "@prisma/client";
import { IFeeds } from "@pushprotocol/restapi";
import { useAddress } from "@thirdweb-dev/react";
import { NextPageContext } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";

import Chat from "@/components/Chat/Chat";
import Navbar from "@/components/Navbar";
import useChat from "@/hooks/useChat";
import { fetchUnique } from "@/pages/api/deal/list";
import { addressFormat } from "@/utils/format";

type Props = {
  deal: string;
};

export default function Protected({ deal }: Props) {
  const tempDeal: Deal & {
    workers: Worker[];
  } = JSON.parse(deal);
  const [feeds, setFeeds] = useState<IFeeds[]>();

  const { fetchListOfUserChats } = useChat();
  const fetchChatList = async () => {
    const result = await fetchListOfUserChats();
    setFeeds(result);
  };

  useEffect(() => {
    fetchChatList();
  }, []);
  const chatWithClient = () => {
    // Notify to Client
    // Open Chat Modal
  };
  return (
    <>
      <Navbar />
      <Heading px="30px" py="40px">
        Deal Chat
      </Heading>
      <Center>
        <HStack alignItems="flex-start">
          <Box>
            <Text>Chat List</Text>
            {feeds?.map((feed) => (
              <Link
                key={feed.chatId}
                href={`/deal/${tempDeal.id}/chat/${feed.msg.fromDID.replace(
                  "eip155:",
                  ""
                )}`}
              >
                <Box>
                  <Text>
                    {addressFormat(feed.msg.fromDID.replace("eip155:", ""))}
                  </Text>
                </Box>
              </Link>
            ))}
          </Box>
          {/* <Center w="100%"> */}
          <Chat deal={tempDeal} />
          {/* </Center> */}
        </HStack>
      </Center>
    </>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const deal = await fetchUnique(context.query.dealId as string);
  return {
    props: {
      deal: JSON.stringify(deal)
    }
  };
}
