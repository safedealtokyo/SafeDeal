import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { contractAddress, destinationAddress } = req.body;
  if (req.method === "POST") {
    try {
      const sdk = ThirdwebSDK.fromPrivateKey(
        process.env.PRIVATE_KEY!,
        process.env.NEXT_PUBLIC_CHAIN!
      );

      // あとで変える
      const metadata = {
        name: "実績証明",
        description: "実績証明",
      };
      const contract = await sdk.getContract<"nft-collection">(contractAddress);
      const txResult = await contract.erc721.mintTo(
        destinationAddress,
        metadata
      );
      return res.status(200).json(txResult);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
  return res.status(405).json({ error: "Method not allowed" });
}
