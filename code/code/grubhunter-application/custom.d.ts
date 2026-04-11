import { DefaultSession } from "next-auth";

declare global {
  var mongoose: typeof mongoose;
}

// declare module "next-auth" {
//   interface Session {
//     user: {
//       fdlst_private_userId: string;
//     } & DefaultSession["user"];
//   }
// }

export {};
