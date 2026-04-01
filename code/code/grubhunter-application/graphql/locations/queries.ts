import { LocationInterface } from "@/mongoose/locations/interface";
import {
  findAllLocations,
  findLocationsById,
  onUserWishlist,
} from "@/mongoose/locations/services";

export const queries = {
  allLocations: async (_: undefined) => {
    const data = await findAllLocations();
    //console.log(data);
    return data;
  },
  locationsById: async (_: undefined, param: LocationInterface) => {
    const data = await findLocationsById([param.location_id]);
    return data;
  },
  onUsersWishlist: async (_: undefined, param: { user_id: string }) => {
    const data = await onUserWishlist(param.user_id);
    return data;
  },
};
