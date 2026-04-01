import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
  PreviewData,
} from "next";
import { ParsedUrlQuery } from "querystring";
import { findLocationsById } from "@/mongoose/locations/services";
import { LocationInterface } from "@/mongoose/locations/interface";
import LocationDetailsItem from "../components/location-details";
import NotFoundPage from "../components/notFound";
import dbConnect from "@/middleware/data/mongo-connect";
import Head from "next/head";

const LocationPage: NextPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  try {
    const locationArray: LocationInterface[] = JSON.parse(props.data?.location);
    const location = locationArray[0];
    const pageTitle = location.name;
    return (
      <div>
        <Head>
          <title>{pageTitle}</title>
          <meta name="Page Title" content="Restaurant Name" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <LocationDetailsItem location={location}></LocationDetailsItem>
      </div>
    );
  } catch {
    return <NotFoundPage />;
  }
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>,
) => {
  await dbConnect();

  const location_id = context.query.location_id;
  let location: LocationInterface[] | [] = [];

  location = await findLocationsById(location_id);
  const locationString = JSON.stringify(location);
  return {
    props: {
      data: {
        location: locationString,
      },
    },
  };
};

export default LocationPage;
