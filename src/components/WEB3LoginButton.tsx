import { Button } from "@chakra-ui/react";
import { useAddress, useMetamask } from "@thirdweb-dev/react";
import { useRouter } from "next/router";

import usePush from "@/hooks/usePush";

export default function Web3LoginButton() {
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const { handleOptIn } = usePush();

  const handleLogin = async () => {
    try {
      if (!address) {
        await connectWithMetamask();
        await handleOptIn();
        return;
      }
    } catch (error) {
      window.alert("error");
    }
  };

  return (
    <Button
      onClick={handleLogin}
      as="a"
      display={{ md: "inline-flex" }}
      fontSize="sm"
      fontWeight={600}
      color="white"
      bg="black"
      href="#"
      py={3}
    >
      Connect
    </Button>
  );
}
