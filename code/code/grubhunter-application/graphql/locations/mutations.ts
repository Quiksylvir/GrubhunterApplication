import { LocationInterface } from "@/mongoose/locations/interface";
import { updateWishlist } from "@/mongoose/locations/services";
import { createContext, useState, useContext } from "react";
import { authGuard } from "@/middleware/auth-guards";
import { JWT } from "next-auth/jwt";

interface contextInterface {
  token: JWT;
}

const authContext = createContext({
  user: null,
  isAuthenticaed: false,
});

interface WishListInterface {
  location_id: string;
  user_id: string;
}

export const mutations = {
  addWishlist: async (
    _: any,
    param: { data: LocationInterface },
    userId: string,
    context: contextInterface,
  ) => {
    const wishlist: WishListInterface = {
      location_id: param.data.location_id,
      user_id: userId,
    };

    const guard = authGuard({ param }, context);
    if (guard !== true) {
      return guard;
    }

    const data = await updateWishlist(
      wishlist.location_id,
      wishlist.user_id,
      "add",
    );
    console.log(data);
    return data;
  },

  removeWishlist: async (
    _: any,
    param: { data: LocationInterface },
    userId: string,
    context: contextInterface,
  ) => {
    const wishlist: WishListInterface = {
      location_id: param.data.location_id,
      user_id: userId,
    };

    const guard = authGuard({ param }, context);
    if (guard !== true) {
      return guard;
    }

    const data = await updateWishlist(
      wishlist.location_id,
      wishlist.user_id,
      "remove",
    );
    return data;
  },
};
