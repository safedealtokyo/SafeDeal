import { ChakraProvider } from "@chakra-ui/react";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { ChainId } from "@thirdweb-dev/sdk";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { RecoilRoot } from "recoil";

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
          <Component {...pageProps} />
        </ThirdwebProvider>
      </ChakraProvider>
    </RecoilRoot>
  );
}
