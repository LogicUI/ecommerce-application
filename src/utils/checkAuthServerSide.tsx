import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import * as admin from "firebase-admin";

type AuthProps = {
  uid: string;
};

const checkAuthServerSide = async (
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<AuthProps>> => {
  try {
    const authHeader = context.req.headers.authorization || "";
    const match = authHeader.match(/^Bearer (.*)$/);
    if (!match) {
      throw new Error("No token found");
    }
    const idToken = match[1];

    const decodedClaims = await admin.auth().verifyIdToken(idToken);

    return { props: { uid: decodedClaims.uid } };
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
};

export default checkAuthServerSide;
