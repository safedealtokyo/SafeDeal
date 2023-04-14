/* eslint-disable react/jsx-one-expression-per-line */
import { Center, Heading } from "@chakra-ui/react";
import { Deal } from "@prisma/client";
import { NextPageContext } from "next";
import Link from "next/link";
import { getSession } from "next-auth/react";

import Chat from "@/components/Chat/Chat";
import Navbar from "@/components/Navbar";
import { fetchUnique } from "@/pages/api/deal/list";
import { UserSession } from "@/types/UserSession";

type Props = {
  deal: string;
  session: UserSession;
};

export default function Protected({ session, deal }: Props) {
  const tempDeal: Deal = JSON.parse(deal);
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
      <Center w="100%">
        <Chat deal={tempDeal} />
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
