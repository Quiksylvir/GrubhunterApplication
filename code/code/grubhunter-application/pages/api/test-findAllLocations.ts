import dbConnect from "@/middleware/data/mongo-connect";
import type { NextApiRequest, NextApiResponse } from "next";
import { findAllLocations } from "@/mongoose/locations/services";

dbConnect();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const locations = await findAllLocations();
  return res.status(200).json(locations);
}
