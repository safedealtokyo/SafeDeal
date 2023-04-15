/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
import { Box, Button } from "@chakra-ui/react";
import { Deal } from "@prisma/client";
import {
  useAddress,
  useContract,
  useMetamask,
  useMintNFT,
  Web3Button,
} from "@thirdweb-dev/react";
import axios from "axios";
import { useRouter } from "next/router";

import usePush from "@/hooks/usePush";
import useSafe from "@/hooks/useSafe";

type Props = {
  deal: Deal;
  onClose: () => void;
};

export default function MintButtonFromWallet({ deal, onClose }: Props) {
  const router = useRouter();
  const contract = useContract(deal.contractAddress, "nft-collection");
  const { mutate: mintNft, isLoading } = useMintNFT(contract.contract);
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const { pushTarget } = usePush();

  const { confirmTransaction, isLoading: safeLoading } = useSafe();
  return (
    <Box>
      {router.query.workerAddress ? (
        <Button
          width="100%"
          colorScheme="blue"
          isLoading={isLoading || safeLoading}
          disabled={isLoading || safeLoading}
          onClick={async () => {
            mintNft({
              metadata: {
                name: `Safe Deal: ${deal.title}`,
              },
              to: router.query.workerAddress as string,
            });
            await confirmTransaction(deal.multiSigAddress as string);
            await pushTarget(
              "Approved",
              "Your work approved",
              router.query.workerAddress as string
            );
            onClose();
          }}
        >
          Approve Worker Job and send SBT
        </Button>
      ) : (
        <Button onClick={() => connectWithMetamask()}>Connect Wallet</Button>
      )}
    </Box>
  );
}
