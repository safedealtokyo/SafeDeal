import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@/utils/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body } = req;
  if (req.method === "GET") {
    try {
      const result = await fetchList();
      console.log(result);
      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
  return res.status(405).json({ error: "Method not allowed" });
}

export const fetchList = async () => {
  const result = await prisma.deal.findMany({});
  return result;
};

export const fetchUnique = async (dealId: string) => {
  const result = await prisma.deal.findUnique({
    where: {
      id: dealId,
    },
  });
  return result;
};
