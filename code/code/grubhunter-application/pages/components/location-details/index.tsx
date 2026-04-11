import { LocationInterface } from "@/mongoose/locations/interface";
import styles from "./index.module.css";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import ButtonComponent from "../button";
import { mutations } from "@/graphql/locations/mutations";

interface WishListInterface {
  location_id: string;
  user_id: string;
}

interface LocationProps {
  location: LocationInterface;
}

const LocationDetailsItem = ({ location }: LocationProps) => {
  const { data: session, status } = useSession();
  const [onWishlist, setOnWishlist] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session?.user?.fdlst_private_userId) {
      const user_id = session.user.fdlst_private_userId;
      const isWishlisted = location.on_wishlist.includes(user_id);
      setOnWishlist(isWishlisted);
    }
  }, [session, location]);

  const wishlistAction = async (location_id: string, user_id: string) => {
    if (loading) return;

    setLoading(true);
    //What do???? mutations for adding user id to wishlist array
    if (onWishlist === true) {
      mutations.removeWishlist({ data: location }, user_id);
    } else {
      mutations.addWishlist({ data: location }, user_id);
    }
    ///Pretty much above this spot and my mutations.gql and mutations.ts
    setLoading(false);

    return (
      <ul>
        <li className={styles.root} id="List-details-id">
          <h2>{`Address: ${location.address}`}</h2>
          <h2>{`Zipcode: ${location.zipcode}`}</h2>
          <h2>{`Borough: ${location.borough}`}</h2>
          <h2>{`Cuisine: ${location.cuisine}`}</h2>
          <h2>{`Grade: ${location.grade}`}</h2>
        </li>
      </ul>
    );
  };

  if (session?.user?.fdlst_private_userId) {
    return (
      <ButtonComponent
        variant={onWishlist ? "outline" : "blue"}
        isDisabled={loading}
        clickHandler={() =>
          wishlistAction(
            location.location_id,
            session?.user?.fdlst_private_userId,
          )
        }
      >
        {onWishlist ? "Remove from your Wishlist" : "Add to your Wishlist"}
      </ButtonComponent>
    );
  }
};

export default LocationDetailsItem;
