/* eslint-disable react/jsx-one-expression-per-line */
import { Box, Center, HStack, Heading, Text } from "@chakra-ui/react";
import { Deal } from "@prisma/client";
import { IFeeds } from "@pushprotocol/restapi";
import { NextPageContext } from "next";
import Link from "next/link";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";

import Chat from "@/components/Chat/Chat";
import Navbar from "@/components/Navbar";
import useChat from "@/hooks/useChat";
import { fetchUnique } from "@/pages/api/deal/list";
import { UserSession } from "@/types/UserSession";
import { addressFormat } from "@/utils/format";

type Props = {
  deal: string;
  session: UserSession;
};

export default function Protected({ session, deal }: Props) {
  const tempDeal: Deal = JSON.parse(deal);
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
      <Navbar session={session} />
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
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      session,
      deal: JSON.stringify(deal),
    },
  };
}
