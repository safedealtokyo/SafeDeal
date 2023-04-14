/* eslint-disable no-promise-executor-return */
import {
  Box,
  Button,
  Container,
  HStack,
  Input,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import {
  ChainId,
  ConnectWallet,
  useAddress,
  useSigner,
} from "@thirdweb-dev/react";
import axios from "axios";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";

import usePush from "@/hooks/usePush";
import { useSDKSocket } from "@/hooks/useSDKSocket";
import { useToaster } from "@/hooks/useToaster";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [message, setMessage] = useState<string>();
  const [title, setTitle] = useState<string>();
  const [targetAddress, setTargetAddress] = useState<string>();

  const address = useAddress();
  // const socketData = useSDKSocket({
  //   account: address,
  //   chainId: ChainId.Goerli,
  //   env: "staging",
  //   isCAIP: false,
  // });

  const {
    socketData,
    isOptIn,
    handleOptIn,
    handleOptOut,
    fetchNotification,
    pushBroadcast,
    pushTarget,
  } = usePush();

  const { infoToast } = useToaster();

  // メッセージの更新取得と通知
  useEffect(() => {
    if (socketData.feedsSinceLastConnection[0]) {
      const last = socketData.feedsSinceLastConnection.length - 1;
      console.log(
        "feed",
        socketData.feedsSinceLastConnection[last].payload.data.amsg
      );
      infoToast(socketData.feedsSinceLastConnection[last].payload.data.amsg);
    }
  }, [socketData.feedsSinceLastConnection]);

  return (
    <Container>
      <Text>
        Address:
        {address}
      </Text>
      <Box>
        {address ? (
          <HStack>
            {isOptIn ? (
              <Button onClick={handleOptOut}>Opt-Out</Button>
            ) : (
              <Button onClick={handleOptIn}>Opt-In</Button>
            )}

            <Button onClick={fetchNotification}>fetchNotification</Button>
          </HStack>
        ) : (
          <ConnectWallet />
        )}
      </Box>

      <Box className="mb-32 flex flex-row text-center mt-12">
        <Box>
          <Text fontWeight="bold">Notify</Text>
          <VStack>
            <Input
              type="text"
              placeholder="Target Address"
              onChange={(e) => setTargetAddress(e.target.value)}
            />
            <Input
              type="text"
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
            />
            <Textarea
              placeholder="Message"
              noOfLines={6}
              height="80px"
              textAlign="start"
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button onClick={() => pushBroadcast(title!, message!)}>
              Send Broadcast
            </Button>
            <Button
              onClick={() => pushTarget(title!, message!, targetAddress!)}
            >
              Send Target
            </Button>

            <Box>{String(socketData.isSDKSocketConnected)}</Box>
          </VStack>
        </Box>
      </Box>
    </Container>
  );
}
