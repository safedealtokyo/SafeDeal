import { Box, Button, Center, Container, HStack, Text } from "@chakra-ui/react";
import { HuddleIframe, IframeConfig } from "@huddle01/huddle01-iframe";
import { useEventListener, useHuddle01 } from "@huddle01/react";
import { useMeetingMachine } from "@huddle01/react/hooks";
import { Inter } from "next/font/google";
import { useEffect, useRef, useState } from "react";

import usePush from "@/hooks/usePush";

const inter = Inter({ subsets: ["latin"] });

type Props = {
  roomId: string;
};
export function Huddle({ roomId }: Props) {
  const fetchIframeConfig = () => ({
    roomUrl: `https://iframe.huddle01.com/${roomId}`,
    height: "700px",
    width: "100%",
    noBorder: false,
  });
  const videoRef = useRef<HTMLVideoElement>(null);
  const { state, send } = useMeetingMachine();

  // Event Listner
  useEventListener("lobby:cam-on", () => {
    if (state.context.camStream && videoRef.current) {
      videoRef.current.srcObject = state.context.camStream as MediaStream;
    }
  });
  const { initialize, isInitialized } = useHuddle01();

  useEffect(() => {
    // its preferable to use env vars to store projectId
    initialize(process.env.NEXT_PUBLIC_HUDDLE_PROJECT_ID || "");
  }, []);

  return (
    <Center w="100%">
      <Box w="100%">
        {isInitialized ? (
          <Box w="100%">
            <Box w="100%">
              {roomId ? (
                <Box w="100%">
                  <HuddleIframe config={fetchIframeConfig()} />
                </Box>
              ) : (
                <HStack>
                  <Text>No Room</Text>
                </HStack>
              )}
            </Box>
          </Box>
        ) : (
          "Please initialize"
        )}
      </Box>
    </Center>
  );
}
