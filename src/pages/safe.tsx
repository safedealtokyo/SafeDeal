/* eslint-disable no-console */
/* eslint-disable consistent-return */
import { Box, Button, Input, Text, VStack } from "@chakra-ui/react";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import { BigNumber, ethers } from "ethers";
import { useState } from "react";

import useSafe from "@/hooks/useSafe";

function SafePage() {
  const address = useAddress();
  const [workerAddress, setWorkerAddress] = useState<string>();
  const [depositAmountEth, setDepositAmountEth] = useState<string>();
  const {
    fetchSafeSDK,
    deploySafe,
    proposeTransaction,
    confirmTransaction,
  } = useSafe();
  if (!address) {
    return <ConnectWallet />;
  }
  return (
    <VStack>
      <Text>
        Address:
        {address}
      </Text>
      <Box>Safe</Box>
      <VStack>
        <Text fontSize="2xl" fontWeight="bold">Deploy Safe</Text>
        <Input type="text" placeholder="worker wallet address" onChange={(e) => setWorkerAddress(e.target.value)} />
        <Input type="text" placeholder="deposit amount of ETH" onChange={(e) => setDepositAmountEth(e.target.value)} />
        <Button
          colorScheme="blue"
          onClick={() => {
            if (workerAddress && depositAmountEth) {
              deploySafe(workerAddress, depositAmountEth);
            }
          }}
        >
          Deploy Safe
        </Button>
      </VStack>

      <VStack>
        <Text fontSize="2xl" fontWeight="bold">Deploy Safe</Text>
        <Button
          colorScheme="blue"
          onClick={proposeTransaction}
        >
          Propose Withdraw Transaction (Workerが実行する想定でバリデーション)
        </Button>
      </VStack>

      <VStack>
        <Text fontSize="2xl" fontWeight="bold">Fetch Safe</Text>
        <Button onClick={async () => {
          const safeSdk = await fetchSafeSDK();
          console.log(ethers.utils.formatEther(await safeSdk?.getBalance() as BigNumber));
        }}
        >
          Fetch
        </Button>
      </VStack>

      <VStack>
        <Text fontSize="2xl" fontWeight="bold">Fetch Safe</Text>
        <Button onClick={confirmTransaction}>
          Confirm & Execute Transaction(クライアントが実行する想定でバリデーション)
        </Button>
      </VStack>

      <VStack>
        <Text fontSize="2xl" fontWeight="bold">Fetch Safe</Text>
        <Button onClick={confirmTransaction}>
          Confirm Transaction(クライアントが実行する想定でバリデーション)
        </Button>
      </VStack>

    </VStack>
  );
}

export default SafePage;
