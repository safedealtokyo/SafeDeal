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
  if (req.method === "POST") {
    try {
      const roomData = await createIframeRoom();
      await prisma.worker.create({
        data: {
          roomId: roomData.data.roomId,
          walletAddress: req.body.walletAddress,
          deal: {
            connect: {
              id: req.body.dealId,
            },
          },
        },
      });

      return res.status(200);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
  return res.status(405).json({ error: "Method not allowed" });
}
