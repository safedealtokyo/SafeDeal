/* eslint-disable react/jsx-one-expression-per-line */
import {
  Box,
  Card,
  Heading,
  SimpleGrid,
  Text,
  VStack
} from "@chakra-ui/react";
import { Deal } from "@prisma/client";
import { NextPageContext } from "next";
import Link from "next/link";

import Navbar from "@/components/Navbar";
import { formatDate } from "@/utils/formatDate";

import { fetchList } from "./api/deal/list";

type Props = {
  deals: string;
};

export default function Protected({ deals }: Props) {
  const tempDeals: Deal[] = JSON.parse(deals);
  return (
    <Box mt="60px">
      <Navbar />
      <Box px="30px" py="30px">
        <VStack>
          <Heading>Deal List</Heading>

          <SimpleGrid columns={{ base: 2, md: 3 }} spacing="24px">
            {tempDeals
              .filter((deal) => deal.multiSigAddress === null)
              .map((deal) => (
                <Link key={deal.id} href={`/deal/${deal.id}`}>
                  <Card width="240px" py="50px">
                    <VStack alignItems="flex-start" px="20px">
                      <Text fontWeight="bold" fontSize="xl">
                        Title:{deal.title}
                      </Text>
                      <Text>Prize:{deal.fixedFee} ETH</Text>
                      <Text>Detail:{deal.jobDetails}</Text>
                      <Text>
                        Deadline:
                        {formatDate(deal.applicationDeadline.toString())}
                      </Text>
                    </VStack>
                  </Card>
                </Link>
              ))}
          </SimpleGrid>
        </VStack>
      </Box>
    </Box>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const deals = await fetchList();
  return {
    props: {
      deals: JSON.stringify(deals)
    }
  };
}
