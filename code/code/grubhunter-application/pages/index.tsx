import type {
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPage,
  PreviewData,
} from "next";
import { ParsedUrlQuery } from "querystring";
import { findAllLocations } from "@/mongoose/locations/services";
import { LocationInterface } from "@/mongoose/locations/interface";
import LocationsList from "./components/locations-list";
import dbConnect from "@/middleware/data/mongo-connect";
import Head from "next/head";

const StartPage: NextPage = (
  props: InferGetStaticPropsType<typeof getStaticProps>,
) => {
  const pageTitle = "Grubhunter Application";
  const locations: LocationInterface[] = JSON.parse(props.data?.locations);
  return (
    <div>
      <Head>
        <title>{pageTitle}</title>
        <meta name="Page Title" content="Grubhunter title" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <LocationsList locations={locations}></LocationsList>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext<ParsedUrlQuery, PreviewData>,
) => {
  await dbConnect();

  let locations: LocationInterface[] | [] = [];

  locations = await findAllLocations();
  const locationsString = JSON.stringify(locations);

  return {
    props: {
      data: {
        locations: locationsString,
      },
    },
  };
};

export default StartPage;
