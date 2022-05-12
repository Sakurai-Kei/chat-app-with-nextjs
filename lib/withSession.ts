import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextApiHandler,
} from "next";
import { IronSessionOptions } from "iron-session";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      _id: string;
      username: string;
    };
  }
}

export interface UserCookie {
  _id?: string;
  username?: string;
}

export const sessionOptions: IronSessionOptions = {
  cookieName: "user-cookie",
  password: process.env.COOKIE_SECRET as string,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

export function withSessionRoute(handler: NextApiHandler) {
  return withIronSessionApiRoute(handler, sessionOptions);
}

export function withSessionSsr<
  P extends { [key: string]: unknown } = { [key: string]: unknown }
>(
  handler: (
    context: GetServerSidePropsContext
  ) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>
) {
  return withIronSessionSsr(handler, sessionOptions);
}
