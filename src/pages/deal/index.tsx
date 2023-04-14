import { Box, Heading } from "@chakra-ui/react";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

import MintButton from "@/components/MintButton";
import MintButtonFromWallet from "@/components/MintButtonFromWallet";
import Navbar from "@/components/Navbar";
import { UserSession } from "@/types/UserSession";

type Props = {
  session: UserSession;
};

export default function Protected({ session }: Props) {
  return (
    <Box>
      <Navbar session={session} />
      <Heading>Dealページ</Heading>
      <MintButton
        contractAddress="0xB9b6A92f52b2fcb7CE3f71b90Cf1793101753eC0"
        buttonLabel="取引終了"
      />
      <MintButtonFromWallet
        contractAddress="0x8A8036b5fe57f7347A8B80C3d364557E28b8fd6F"
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
        permanent: false
      }
    };
  }
  return {
    props: {
      session
    }
  };
}
