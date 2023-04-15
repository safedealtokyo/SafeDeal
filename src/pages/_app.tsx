import { Box, ChakraProvider } from "@chakra-ui/react";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { ChainId } from "@thirdweb-dev/sdk";
import type { AppProps } from "next/app";
import React, { useEffect, useState } from "react";
import { RecoilRoot } from "recoil";

import Navbar from "@/components/Navbar";

export default function App({ Component, pageProps }: AppProps) {
  const [activeChain, setActiveChain] = useState<
    ChainId.Goerli | ChainId.Polygon
  >(ChainId.Goerli);
  useEffect(() => {
    switch (process.env.NEXT_PUBLIC_CHAIN) {
      case "goerli": {
        setActiveChain(ChainId.Goerli);
        break;
      }
      case "polygon": {
        setActiveChain(ChainId.Polygon);
        break;
      }
      default: {
        setActiveChain(ChainId.Goerli);
        break;
      }
    }
  }, [process.env.NEXT_PUBLIC_CHAIN]);

  return (
    <RecoilRoot override>
      <ChakraProvider>
        <ThirdwebProvider activeChain={activeChain}>
          <Box position="relative" zIndex="1">
            <Navbar />
          </Box>
          <Box position="relative" zIndex="0">
            <Component {...pageProps} />
          </Box>
        </ThirdwebProvider>
      </ChakraProvider>
    </RecoilRoot>
  );
}
