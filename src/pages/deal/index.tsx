import { Box, Heading } from "@chakra-ui/react";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

import Navbar from "@/components/Navbar";
import { UserSession } from "@/types/UserSession";
import MintButton from "@/components/MintButton";

type Props = {
  session: UserSession;
};

export default function Protected({ session }: Props) {
  return (
    <Box>
      <Navbar session={session} />
      <Heading>Dealページ</Heading>
      <MintButton
        contractAddress={session.address}
        destinationAddress={"0x62B4C62559DC999523D89a72056e3D0AbD2B0ea7"}
        buttonLabel={"取引終了"}
      />
    </Box>
  );
}

export async function getServerSideProps(context: NextPageContext) {
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
    },
  };
}
