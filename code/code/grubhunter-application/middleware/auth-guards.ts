import { JWT } from "next-auth/jwt";
import { GraphQLError } from "graphql";

interface paramInterface {
  user_id: string;
  location_id: string;
}

interface contextInterface {
  token: JWT;
}

export const authGuard = (
  params: paramInterface,
  context: contextInterface,
): boolean | Error => {
  if (!context || !context.token || !context.token.sub) {
    throw new GraphQLError("No user authenticated.", {
      extensions: {
        code: "UNAUTHENTICATED",
        http: { status: 500 },
      },
    });
  }

  if (context.token.sub !== params.user_id) {
    throw new GraphQLError("User not authorized.", {
      extensions: {
        code: "UNAUTHORIZED",
        http: { status: 500 },
      },
    });
  }

  return true;
};
