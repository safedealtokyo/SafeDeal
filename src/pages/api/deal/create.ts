import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import type { NextApiRequest, NextApiResponse } from "next";

import { formatFormData } from "@/utils/formatJson";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body } = req;
  if (req.method === "POST") {
    const sdk = ThirdwebSDK.fromSigner(body.signer);
    const options = {
      name: body.data.title,
      description: formatFormData(body.data).toString(),
      primary_sale_recipient: process.env.NEXT_PUBLIC_PRIMARIY_SALES_ADDRESS!,
    };
    const contractAddress = await sdk.deployer.deployNFTCollection(options);
    try {
      return res.status(200).json(contractAddress);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
  return res.status(405).json({ error: "Method not allowed" });
}
