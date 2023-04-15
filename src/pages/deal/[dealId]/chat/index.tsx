import {
  Box,
  HStack,
  Heading,
  Text,
  VStack
} from "@chakra-ui/react";
import { Deal, Worker } from "@prisma/client";
import axios from "axios";
import { NextPageContext } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { MessageListCard } from "@/components/Chat/MessageListCard";
import { fetchUnique } from "@/pages/api/deal/list";

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

  const fetchChatList = async () => {
    const result = await axios.get(
      `/api/deal/unique?dealId=${router.query.dealId}`
    );
    setFeeds(result.data);
  };

  useEffect(() => {
    fetchChatList();
  }, []);
  return (
    <>
      <VStack mt="60px">
        <Heading px="30px" py="40px">
          Deal Chat
        </Heading>

        <HStack alignItems="flex-start">
          <Box>
            <Text fontWeight="bold" fontSize="2xl">
              Chat List
            </Text>
            <MessageListCard tempDealId={tempDeal.id} workers={feeds?.workers} />
          </Box>
        </HStack>
      </VStack>
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
