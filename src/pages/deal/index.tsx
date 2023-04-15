/* eslint-disable react/jsx-one-expression-per-line */
import {
  Box,
  Card,
  Center,
  Heading,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Deal } from "@prisma/client";
import { NextPageContext } from "next";
import Link from "next/link";

import MintButton from "@/components/MintButton";
import MintButtonFromWallet from "@/components/MintButtonFromWallet";
import Navbar from "@/components/Navbar";

import { fetchList } from "../api/deal/list";

type Props = {
  deals: string;
};

export default function Protected({ deals }: Props) {
  const tempDeals: Deal[] = JSON.parse(deals);
  return (
    <Box>
      <Navbar />
      <Heading>Dealページ</Heading>
      <Center>
        <SimpleGrid columns={4} spacing="24px">
          {tempDeals
            .filter((deal) => deal.multiSigAddress === null)
            .map((deal) => (
              <Link key={deal.id} href={`/deal/${deal.id}`}>
                <Card width="200px" py="20px">
                  <VStack>
                    <Text>{deal.title}</Text>
                    <Text>{deal.fixedFee} ETH</Text>
                  </VStack>
                </Card>
              </Link>
            ))}
        </SimpleGrid>
      </Center>
      <MintButton
        contractAddress="0xB9b6A92f52b2fcb7CE3f71b90Cf1793101753eC0"
        buttonLabel="取引終了"
      />
      {/* <MintButtonFromWallet contractAddress="0x8A8036b5fe57f7347A8B80C3d364557E28b8fd6F" /> */}
    </Box>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const deals = await fetchList();
  return {
    props: {
      deals: JSON.stringify(deals),
    },
  };
}
