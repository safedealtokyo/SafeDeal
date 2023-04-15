import { Button } from "@chakra-ui/react";
import { useAddress, useMetamask } from "@thirdweb-dev/react";
import { signIn } from "next-auth/react";
import { useEffect } from "react";

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
      console.log(error);
      window.alert("error");
    }
  };

  useEffect(() => {
    if (address) {
      const callbackUrl = "/deal";
      signIn("credentials", { address, callbackUrl });
    }
  }, [address]);

  return (
    <Button
      onClick={handleLogin}
      colorScheme="teal"
      as="a"
      display={{ base: "none", md: "inline-flex" }}
      fontSize="sm"
      fontWeight={600}
      color="white"
      bg="pink.400"
      href="#"
      _hover={{
        bg: "pink.300",
      }}
    >
      {address ? "Sign In with Wallet" : "Connect Wallet"}
    </Button>
  );
}
