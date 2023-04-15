/* eslint-disable react/jsx-one-expression-per-line */
import { Box, Center, HStack, Heading, Text } from "@chakra-ui/react";
import { Deal, Worker } from "@prisma/client";
import { IFeeds } from "@pushprotocol/restapi";
import { useAddress } from "@thirdweb-dev/react";
import axios from "axios";
import { NextPageContext } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
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
  const router = useRouter();
  const tempDeal: Deal & {
    workers: Worker[];
  } = JSON.parse(deal);
  const [feeds, setFeeds] = useState<
    Deal & {
      workers: Worker[];
    }
  >();

  const { fetchListOfUserChats } = useChat();
  const fetchChatList = async () => {
    const result = await axios.get(
      `/api/deal/unique?dealId=${router.query.dealId}`
    );
    setFeeds(result.data);
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
            {feeds?.workers?.map((feed) => (
              <Link
                key={feed.userId}
                href={`/deal/${tempDeal.id}/chat/${feed.walletAddress}`}
              >
                <Box>
                  <Text>{addressFormat(feed.walletAddress)}</Text>
                </Box>
              </Link>
            ))}
          </Box>
          {/* <Center w="100%"> */}
          {/* <Chat deal={tempDeal} /> */}
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
      deal: JSON.stringify(deal),
    },
  };
}
