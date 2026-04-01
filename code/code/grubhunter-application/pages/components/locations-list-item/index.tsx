import Link from "next/link";
import { LocationInterface } from "@/mongoose/locations/interface";
import styles from "./index.module.css";

interface LocationProps {
  location: LocationInterface;
}

const LocationsListItem = ({ location }: LocationProps) => {
  return (
    <li className={styles.root} id="List-item-id">
      <h2>{location.name}</h2>
      <h2>{location.borough}</h2>
      <h2>{location.cuisine}</h2>
      <Link href={`/location/${location.location_id}`}>View Details</Link>
    </li>
  );
};

export default LocationsListItem;
