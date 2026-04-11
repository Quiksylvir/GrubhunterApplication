import { LocationInterface } from "./interface";
import { FilterLocationType, FilterWishlistType } from "./custom";
import Locations from "./model";

async function findLocations(
  filter: FilterLocationType | FilterWishlistType | {},
) {
  try {
    const result: Array<LocationInterface | undefined> =
      await Locations.find(filter);

    return result as LocationInterface[];
  } catch (err) {
    console.log(err);
  }

  return [];
}

export async function findAllLocations() {
  const filter = {};

  return await findLocations(filter);
}

export async function findLocationsById(
  location_ids: string[],
): Promise<LocationInterface[] | []> {
  const filter = { location_id: location_ids };

  return await findLocations(filter);
}

export async function onUserWishlist(user_id: string) {
  const filter: FilterWishlistType = {
    on_wishlist: {
      $in: [user_id],
    },
  };

  return await findLocations(filter);
}

export async function updateWishlist(
  location_id: string,
  user_id: string,
  action: string,
) {
  const filter = { location_id: location_id };
  const options: QueryOptions = { upsert: true, returnDocument: "after" };
  let update = {};

  switch (action) {
    case "add":
      update = { $push: { on_wishlist: user_id } };
      break;

    case "remove":
      update = { $pull: { on_wishlist: user_id } };
      break;
  }

  try {
    const result: LocationInterface | null = await Locations.findOneAndUpdate(
      filter,
      update,
      options,
    );
    return result;
  } catch (err) {
    console.log(err);
  }

  return {};
}
