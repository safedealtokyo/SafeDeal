/* eslint-disable consistent-return */
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
  TableContainer
} from "@chakra-ui/react";
import { Deal } from "@prisma/client";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import axios from "axios";
import { NextPageContext } from "next";
import Link from "next/link";

import Navbar from "@/components/Navbar";
import useConnectPushWebScoket from "@/hooks/useConnectPushWebScoket";
import usePush from "@/hooks/usePush";
import { fetchUnique } from "@/pages/api/deal/list";
import { formatDate } from "@/utils/formatDate";

type Props = {
  deal: string;
};

export default function Protected({ deal }: Props) {
  const address = useAddress();
  const tempDeal: Deal & {
    workers: Worker[];
  } = JSON.parse(deal);
  const { pushTarget } = usePush();
  useConnectPushWebScoket();
  const isClient = () => {
    if (address && tempDeal) {
      return address?.toLowerCase() === tempDeal.ownerAddress.toLowerCase();
    }
    return false;
  };

  const chatWithClient = async () => {
    // Notify to Client
    if (tempDeal) {
      console.log("notify", tempDeal.ownerAddress);
      await pushTarget("Chat Start", "Chat Start", tempDeal.ownerAddress);
      // Create record
      await axios.post("/api/deal/workers/create", {
        dealId: tempDeal.id,
        walletAddress: address
      });
    }
  };

  return (
    <>
      <Navbar />
      <Container mt="30px">
        <Heading>Deal Detail</Heading>
        <Center w="80%">
          <VStack w="100%">
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
            {isClient() ? (
              <Link href={`/deal/${tempDeal.id}/chat`}>
                <Button width="full" colorScheme="blue" px="5px" mt="10px">
                  Chat with Worker
                </Button>
              </Link>
            ) : (
              <Link href={`/deal/${tempDeal.id}/chat/${address}`}>
                <Button
                  width="full"
                  colorScheme="blue"
                  px="5px"
                  mt="10px"
                  onClick={chatWithClient}
                >
                  Chat with Client
                </Button>
              </Link>
            )}
          </VStack>
        </Center>
      </Container>
    </>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const deal = await fetchUnique(context.query.dealId as string);
  console.log(deal);
  return {
    props: {
      deal: JSON.stringify(deal)
    }
  };
}
