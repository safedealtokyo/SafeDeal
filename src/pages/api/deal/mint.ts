import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { contractAddress } = req.body;
  // TODO: contractAddressのオーナーと実行者が一致していることのチェック
  // TODO: DBから取得
  const destinationAddress = "0x62B4C62559DC999523D89a72056e3D0AbD2B0ea7";
  if (req.method === "POST") {
    try {
      const sdk = ThirdwebSDK.fromPrivateKey(
        process.env.PRIVATE_KEY!,
        process.env.NEXT_PUBLIC_CHAIN!
      );

      // TODO: あとで変える
      const metadata = {
        name: "実績証明",
        description: "実績証明",
      };
      const contract = await sdk.getContract(contractAddress);
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
