import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import type { NextApiRequest, NextApiResponse } from "next";

import { multicallData } from "@/datas/multicallData";
import { formatFormData } from "@/utils/formatJson";
import { prisma } from "@/utils/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body } = req;
  if (req.method === "POST") {
    try {
      const sdk = ThirdwebSDK.fromPrivateKey(
        process.env.PRIVATE_KEY!,
        process.env.NEXT_PUBLIC_CHAIN!
      );
      const options = {
        name: body.title,
        description: formatFormData(body).toString(),
        primary_sale_recipient: process.env.NEXT_PUBLIC_PRIMARIY_SALES_ADDRESS!
      };
      const contractAddress = await sdk.deployer.deployNFTCollection(options);

      await prisma.deal.create({
        data: {
          title: body.title,
          fixedFee: body.fixedFee,
          applicationDeadline: new Date(body.applicationDeadline),
          deliveryDate: new Date(body.deliveryDate),
          jobDetails: body.jobDetails,
          specialNotes: body.specialNotes,
          ownerAddress: body.walletAddress,
          contractAddress
        }
      });

      const contract = await sdk.getContract(contractAddress, "nft-collection");
      const txResult = await contract.roles.grant(
        "minter",
        body.walletAddress
      );

      const tx = await contract.call("multicall", [multicallData]);
      return res.status(200).json({
        contractAddress,
        txResult
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
  return res.status(405).json({ error: "Method not allowed" });
}
