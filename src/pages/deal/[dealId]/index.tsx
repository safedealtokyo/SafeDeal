/* eslint-disable react/jsx-one-expression-per-line */
import { Button, Center, Container, Heading, VStack } from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { Deal } from "@prisma/client";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import { NextPageContext } from "next";
import Link from "next/link";
import { getSession } from "next-auth/react";

import Navbar from "@/components/Navbar";
import { fetchUnique } from "@/pages/api/deal/list";
import { UserSession } from "@/types/UserSession";
import { formatDate } from "@/utils/formatDate";

type Props = {
  deal: string;
  session: UserSession;
};

export default function Protected({ session, deal }: Props) {
  const address = useAddress();
  const tempDeal: Deal = JSON.parse(deal);
  const chatWithClient = () => {
    // Notify to Client
    // Open Chat Modal
  };
  return (
    <>
      <Navbar session={session} />
      <Container mt="30px">
        <Heading>Deal Detail</Heading>
        <Center w="80%">
          <VStack>
            <TableContainer w="100%" mt="24px">
              <Table variant="simple" w="100%">
                <Thead>
                  <Tr>
                    <Th>Column</Th>
                    <Th>Content</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>Title</Td>
                    <Td>{tempDeal.title}</Td>
                  </Tr>
                  <Tr>
                    <Td>Client</Td>
                    <Td>{tempDeal.ownerAddress}</Td>
                  </Tr>
                  <Tr>
                    <Td>Price</Td>
                    <Td>{tempDeal.fixedFee} ETH</Td>
                  </Tr>
                  <Tr>
                    <Td>Detail</Td>
                    <Td>{tempDeal.jobDetails}</Td>
                  </Tr>
                  <Tr>
                    <Td>Notes</Td>
                    <Td>{tempDeal.specialNotes}</Td>
                  </Tr>
                  <Tr>
                    <Td>Application Deadline</Td>
                    <Td>
                      {formatDate(tempDeal.applicationDeadline.toString())}
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Delivery Deadline</Td>
                    <Td>{formatDate(tempDeal.deliveryDate.toString())}</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
            <Link href={`/deal/${tempDeal.id}/chat/${address}`}>
              <Button width="full" colorScheme="blue" px="5px" mt="10px">
                Chat with Client
              </Button>
            </Link>
          </VStack>
          <ConnectWallet />
        </Center>
      </Container>
    </>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const deal = await fetchUnique(context.query.dealId as string);
  console.log(deal);
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
