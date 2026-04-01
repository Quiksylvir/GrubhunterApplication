import dbConnect from "@/middleware/data/mongo-connect";
import type { NextApiRequest, NextApiResponse } from "next";
import LocationModel from "@/mongoose/locations/model";
import { LocationInterface } from "@/mongoose/locations/interface";
dbConnect();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<Array<LocationInterface> | void> {
  const locations = await LocationModel.find({});
  console.log(locations);
  return res.status(200).json(locations);
}
