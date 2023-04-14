import { Button } from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import { useConnect, useAccount } from "wagmi";

export default function Web3LoginButton() {
  const [{ data: connectData }, connect] = useConnect();
  const [{ data: accountData }] = useAccount();

  const handleLogin = async () => {
    try {
      const callbackUrl = "/protected";
      if (accountData?.address) {
        await signIn("credentials", {
          address: accountData.address,
          callbackUrl,
        });
        return;
      }
      const { data } = await connect(connectData.connectors[0]);
      await signIn("credentials", { address: data?.account, callbackUrl });
    } catch (error) {
      console.log(error);
      window.alert("error");
    }
  };

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
      {accountData?.address ? "Sign In with Wallet" : "Connect Wallet"}
    </Button>
  );
}
