import { Box } from "@chakra-ui/react";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

import Navbar from "@/components/Navbar";
import { UserSession } from "@/types/UserSession";

type Props = {
  session: UserSession;
};

export default function Home({ session }: Props) {
  return (
    <Box>
      <Navbar session={session} />
    </Box>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: "/deal",
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
