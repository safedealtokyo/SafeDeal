/* eslint-disable implicit-arrow-linebreak */
import {
  Box,
  Card,
  Heading,
  HStack,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Deal, Worker } from "@prisma/client";
import { useAddress } from "@thirdweb-dev/react";
import { NextPageContext } from "next";
import Link from "next/link";
import React from "react";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";

import { addressFormat } from "@/utils/format";
import { formatDate } from "@/utils/formatDate";

import { fetchList } from "./api/deal/list";

type Props = {
  deals: string;
};

export default function Protected({ deals }: Props) {
  const address = useAddress();
  const tempDeals: (Deal & {
    workers: Worker[];
  })[] = JSON.parse(deals);
  return (
    <Box mt="60px">
      <Box px="30px" py="30px">
        <VStack>
          <Heading>Deal List</Heading>
          <SimpleGrid columns={{ base: 2, md: 3 }} spacing="24px">
            {tempDeals
              .filter(
                (deal) =>
                  deal.multiSigAddress === null ||
                  deal.workers.filter((worker) => worker.userId === address)
                    .length > 0 ||
                  deal.ownerAddress === address
              )
              .map((deal) => (
                <Link key={deal.id} href={`/deal/${deal.id}`}>
                  <Card width="240px" py="50px">
                    <VStack alignItems="flex-start" px="20px">
                      <Stack
                        direction="row"
                        justify="space-between"
                        spacing="4"
                      >
                        <HStack spacing="3">
                          <Jazzicon
                            diameter={30}
                            seed={jsNumberForAddress(deal.ownerAddress)}
                          />
                          <Box>
                            <Text
                              fontWeight="medium"
                              color="emphasized"
                              textDecoration="none"
                            >
                              {address === deal.ownerAddress
                                ? "created by you"
                                : addressFormat(deal.ownerAddress)}
                            </Text>
                          </Box>
                        </HStack>
                      </Stack>
                      <Text fontWeight="bold" fontSize="xl">
                        {deal.title}
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
      deals: JSON.stringify(deals),
    },
  };
}
