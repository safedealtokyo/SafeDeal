import { Box, Center, Heading, VStack } from "@chakra-ui/react";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

import DealCollectionForm from "@/components/DealCollectionForm";
import Navbar from "@/components/Navbar";
import { UserSession } from "@/types/UserSession";

type Props = {
  session: UserSession;
};

export default function Protected({ session }: Props) {
  return (
    <Box>
      <Navbar session={session} />

      <Center>
        <VStack>
          <Heading>Deal作成ページ</Heading>
          <DealCollectionForm />
        </VStack>
      </Center>
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
