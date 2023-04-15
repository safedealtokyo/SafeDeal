import {
  Box,
  Center,
  HStack,
  Stack,
  StackDivider,
  Text,
  Link
} from "@chakra-ui/react";
import { Worker } from "@prisma/client";
import React from "react";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";

type Props = {
    tempDealId?: string,
    workers?: Worker[]
}

export function MessageListCard({ tempDealId, workers }:Props) {
  function getRandomMessage() {
    const messages = [
      "This is a great day to start something new.",
      "I had a fantastic experience at the event.",
      "The sunset today was absolutely breathtaking.",
      "I can't wait to try out the new restaurant in town.",
      "I found a fascinating article that I think you'll enjoy."
    ];

    const randomIndex = Math.floor(Math.random() * messages.length);
    const selectedMessage = messages[randomIndex];
    return selectedMessage.repeat(3); // メッセージを3回繰り返します
  }

  return (
    <Center maxW="mx" mx="auto" py={{ base: "4", md: "8" }}>
      {workers && workers.length > 0 ?
        (
          <Box boxShadow="base" py={4}>
            <Stack divider={<StackDivider />} spacing="4">
              {workers?.map((feed) => (
                <Link
                  _hover={{ textDecoration: "none" }}
                  key={feed.userId}
                  bg="white"
                  href={`/deal/${tempDealId}/chat/${feed.walletAddress}`}
                >
                  <Stack key={feed.userId} fontSize="sm" px="4" spacing="4">
                    <Stack direction="row" justify="space-between" spacing="4">
                      <HStack spacing="3">
                        <Jazzicon diameter={30} seed={jsNumberForAddress(feed.walletAddress)} />
                        <Box>
                          <Text fontWeight="medium" color="emphasized" textDecoration="none">
                            {feed.walletAddress}
                          </Text>
                        </Box>
                      </HStack>
                    </Stack>
                    <Text
                      color="muted"
                      sx={{
                        "-webkit-box-orient": "vertical",
                        "-webkit-line-clamp": "2",
                        overflow: "hidden",
                        display: "-webkit-box"
                      }}
                    >
                      {getRandomMessage()}
                    </Text>
                  </Stack>
                </Link>
              ))}
            </Stack>
          </Box>
        )
        : <Text>You  have not yet received any messages from the Worker.</Text>}
    </Center>
  );
}
