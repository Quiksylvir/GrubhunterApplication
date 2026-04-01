import { LocationInterface } from "@/mongoose/locations/interface";
import LocationsListItem from "../locations-list-item";
import styles from "./index.module.css";

interface LocationsProps {
  locations: LocationInterface[];
}

const LocationsList = ({ locations }: LocationsProps) => {
  return (
    <ul className={`${styles.root}`} id="list-id">
      {locations.length > 0 ? (
        locations.map((location) => (
          <LocationsListItem location={location} key={location.location_id} />
        ))
      ) : (
        <p>No Locations Found</p>
      )}
    </ul>
  );
};

export default LocationsList;
