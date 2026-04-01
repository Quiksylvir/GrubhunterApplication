import { LocationSchema } from "./schema";
import { InferSchemaType } from "mongoose";

export type LocationInterface = InferSchemaType<typeof LocationSchema>;
