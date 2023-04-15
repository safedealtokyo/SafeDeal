import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@/utils/prisma";

import { fetchUnique } from "./list";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body } = req;
  if (req.method === "GET") {
    try {
      console.log("req.query.dealId as string", req.query.dealId as string);
      const result = await fetchUnique(req.query.dealId as string);
      console.log(result);
      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
  return res.status(405).json({ error: "Method not allowed" });
}
