import { LocationInterface } from "@/mongoose/locations/interface";
import styles from "./index.module.css";
import NotFoundPage from "../notFound";

interface LocationProps {
  location: LocationInterface;
}

const LocationDetailsItem = ({ location }: LocationProps) => {
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

export default LocationDetailsItem;
