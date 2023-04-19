import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import type { NextApiRequest, NextApiResponse } from "next";

import { multicallData } from "@/datas/multicallData";
import { formatFormData } from "@/utils/formatJson";
import { prisma } from "@/utils/prisma";

import { createIframeRoom } from "../../huddle/room";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body } = req;
  if (req.method === "GET") {
    try {
      const worker = await prisma.worker.findUnique({
        where: {
          dealId_walletAddress: {
            dealId: req.query.dealId as string,
            walletAddress: req.query.walletAddress as string,
          },
        },
      });

      return res.status(200).json(worker);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
  return res.status(405).json({ error: "Method not allowed" });
}
