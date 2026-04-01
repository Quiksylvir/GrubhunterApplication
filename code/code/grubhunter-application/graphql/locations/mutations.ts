import { LocationInterface } from "@/mongoose/locations/interface";
import { updateWishlist } from "@/mongoose/locations/services";
import { createContext, useState, useContext } from "react";

const authContext = createContext({
  user: null,
  isAuthenticaed: false,
});

interface WishListInterface {
  location_id: string;
  user_id: string;
}

export const mutations = {
  addWishlist: async (_: undefined, param: { data: LocationInterface }) => {
    const wishlist: WishListInterface = {
      location_id: param.data.location_id,
      user_id: "1",
    };

    const data = await updateWishlist(
      wishlist.location_id,
      wishlist.user_id,
      "add",
    );
    console.log(data);
    return data;
  },

  removeWishlist: async (_: undefined, param: { data: LocationInterface }) => {
    const wishlist: WishListInterface = {
      location_id: param.data.location_id,
      user_id: "1",
    };

    const data = await updateWishlist(
      wishlist.location_id,
      wishlist.user_id,
      "remove",
    );
    return data;
  },
};
