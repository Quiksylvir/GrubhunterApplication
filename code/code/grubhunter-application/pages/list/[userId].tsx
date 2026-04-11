import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
  PreviewData,
} from "next";
import { ParsedUrlQuery } from "querystring";
import { LocationInterface } from "@/mongoose/locations/interface";
import { onUserWishlist } from "@/mongoose/locations/services";
import { useSession } from "next-auth/react";
import LocationsList from "../components/locations-list";
import Head from "next/head";
import dbConnect from "@/middleware/data/mongo-connect";

const WishListPage: NextPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const { data: session, status } = useSession();

  const locationsArray: LocationInterface[] = JSON.parse(props.data?.location);
  const userId = props.data?.userId;
  const pageTitle = userId;
  const isRealUser = session?.user.fdlst_private_userId === userId;
  return (
    <div>
      <Head>
        <title>{pageTitle} WishList</title>
        content= {"Grub Hunter Wish List"}
      </Head>
      <h1>
        {isRealUser ? " Your " : " A "}
        wish list!
      </h1>
      {isRealUser && locationsArray?.length === 0 && (
        <>
          <h2>Your list is empty. :/</h2>
          <p>Try adding locations.</p>
        </>
      )}
      <LocationsList locations={locationsArray}></LocationsList>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>,
) => {
  const user_id = context.query.userId;
  let locations: LocationInterface[] | [] = [];
  await dbConnect();
  locations = await onUserWishlist(user_id as string);
  const locationsString = JSON.stringify(locations);
  return {
    props: {
      data: {
        userId: user_id,
        location: locationsString,
      },
    },
  };
};

export default WishListPage;
