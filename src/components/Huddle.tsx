import { Box, Button, Center, Container, HStack, Text } from "@chakra-ui/react";
import { HuddleIframe, IframeConfig } from "@huddle01/huddle01-iframe";
import { useEventListener, useHuddle01 } from "@huddle01/react";
import { useMeetingMachine } from "@huddle01/react/hooks";
import axios from "axios";
import { Inter } from "next/font/google";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import usePush from "@/hooks/usePush";

// import { useNotify } from "@/hooks/useNotify";

const inter = Inter({ subsets: ["latin"] });

type Props = {
  roomId: string;
};
export function Huddle({ roomId }: Props) {
  // const [roomId, setRoomId] = useState<string>();
  const { pushBroadcast } = usePush();
  // const [roomId, setRoomId] = useState<string>()
  const fetchIframeConfig = () => ({
    roomUrl: `https://iframe.huddle01.com/${roomId}`,
    height: "600px",
    width: "80%",
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

  // const handleCreateTokenGatedRoom = async () => {
  //   const res = await axios.post("/api/huddle/tokenGatedRoom");
  //   console.log(res.data);

  //   setRoomId(res.data.data.roomId);
  // };
  // const handleCreateTokenRoom = async () => {
  //   const res = await axios.post("/api/huddle/tokenRoom");
  //   console.log(res.data);

  //   // setRoomId(res.data.data.roomId);
  // };
  // const handleCreateRoom = async () => {
  //   const res = await axios.post("/api/huddle/room");
  //   console.log(res.data.data.roomId);

  //   setRoomId(res.data.data.roomId);
  //   pushBroadcast(
  //     "room",
  //     `ここで: https://iframe.huddle01.com/${res.data.data.roomId}`
  //   );
  // };
  useEffect(() => {
    // its preferable to use env vars to store projectId
    initialize(process.env.NEXT_PUBLIC_HUDDLE_PROJECT_ID || "");
  }, []);

  return (
    <Center w="100%">
      <Box>
        {isInitialized ? (
          <Box>
            <Box>
              {roomId ? (
                <Box>
                  {/* <Box>
                    Room ID:
                    {roomId}
                  </Box> */}
                  <HuddleIframe config={fetchIframeConfig()} />
                </Box>
              ) : (
                <HStack>
                  <Text>No Room</Text>
                  {/* <Button onClick={handleCreateRoom}>Create Room</Button> */}
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
