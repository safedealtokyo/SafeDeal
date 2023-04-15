/* eslint-disable react/jsx-one-expression-per-line */
import { Center, Heading, VStack } from "@chakra-ui/react";
import { Deal, Worker } from "@prisma/client";
import { useAddress } from "@thirdweb-dev/react";
import { NextPageContext } from "next";

import Chat from "@/components/Chat/Chat";
import Navbar from "@/components/Navbar";
import { fetchUnique } from "@/pages/api/deal/list";

type Props = {
  deal: string;
};

export default function Protected({ deal }: Props) {
  const tempDeal: Deal & {
    workers: Worker[];
  } = JSON.parse(deal);
  const chatWithClient = () => {
    // Notify to Client
    // Open Chat Modal
  };
  return (
    <>
      <Navbar />
      <VStack w="100%" mt="60px" pb="60px">
        <Heading px="30px" py="40px">
          Deal Chat
        </Heading>

        <Chat deal={tempDeal} />
      </VStack>
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
