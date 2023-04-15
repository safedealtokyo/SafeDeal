import { Box, Button } from "@chakra-ui/react";
import { EthersAdapter, SafeAccountConfig, SafeFactory } from "@safe-global/protocol-kit";
import { useMetamask, useSigner } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { useState } from "react";

import { UserSession } from "@/types/UserSession";

type Props = {
  address: string;
  workerWalletAddress: string
};

export default function DeployButton({ address, workerWalletAddress }: Props) {
  const signer = useSigner();
  const connectWithMetamask = useMetamask();
  const [loading, setLoading] = useState(false);

  const deploySafe = async () => {
    setLoading(true);
    if (signer) {
      const ethAdapterOwnerClient = new EthersAdapter({
        ethers,
        signerOrProvider: signer
      });
      const safeFactory = await SafeFactory.create({
        ethAdapter: ethAdapterOwnerClient
      });
      const safeAccountConfig: SafeAccountConfig = {
        owners: [
          address as string,
          workerWalletAddress,
          process.env.NEXT_PUBLIC_OWNER_ADDRESS!
        ],
        threshold: 2
      };
      const safeSdkOwner = await safeFactory.deploySafe({ safeAccountConfig });

      const safeAddress = safeSdkOwner.getAddress();
      console.log("Your Safe has been deployed:");
      console.log(`https://goerli.etherscan.io/address/${safeAddress}`);
      console.log(`https://app.safe.global/gor:${safeAddress}`);
      await sendEthToSafe(safeAddress);
    } else {
      alert("ウォレット");
    }
    setLoading(false);
  };

  const sendEthToSafe = async (safeAddress: string) => {
    if (signer) {
      const safeAmount = ethers.utils.parseUnits("0.001", "ether").toHexString();

      const transactionParameters = {
        to: safeAddress,
        value: safeAmount
      };

      const tx = await signer.sendTransaction(transactionParameters);

      console.log("Fundraising.");
      console.log(
        `Deposit Transaction: https://goerli.etherscan.io/tx/${tx.hash}`
      );
    }
  };

  return (
    <Box>
      {
          address ? (
            <Button
              disabled={loading}
              onClick={deploySafe}
            >
              Deploy Safe
            </Button>
          ) : (
            <Button onClick={() => connectWithMetamask()}>Connect Wallet</Button>
          )
        }
    </Box>
  );
}
