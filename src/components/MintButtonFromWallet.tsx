import { Box, Button } from "@chakra-ui/react";
import { useAddress, useContract, useMetamask, useMintNFT, Web3Button } from "@thirdweb-dev/react";
import axios from "axios";

type Props = {
    contractAddress: string;
};

export default function MintButtonFromWallet({ contractAddress }: Props) {
  const contract = useContract(contractAddress, "nft-collection");
  const { mutate: mintNft, isLoading } = useMintNFT(contract.contract);
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  return (
    <Box>
      {
           address ? (
             <Button
               disabled={isLoading}
               onClick={() => mintNft({
                 metadata: {
                   name: "My awesome NFT"
                 },
                 to: address
               })}
             >
               案件終了実績NFTを配布する
             </Button>
           ) : (
             <Button onClick={() => connectWithMetamask()}>Connect Wallet</Button>
           )
       }
    </Box>
  );
}
