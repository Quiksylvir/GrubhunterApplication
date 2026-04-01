import mongoose, { model } from "mongoose";
import { LocationSchema } from "./schema";
import { LocationInterface } from "./interface";

export default mongoose.models.Location ||
  model<LocationInterface>("Location", LocationSchema, "locations");
