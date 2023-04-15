/* eslint-disable react/jsx-one-expression-per-line */
import { Center, Heading } from "@chakra-ui/react";
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
      <Heading px="30px" py="40px">
        Deal Chat
      </Heading>
      <Center w="100%">
        <Chat deal={tempDeal} />
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
