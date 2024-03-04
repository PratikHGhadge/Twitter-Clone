import axios from "axios";
import { prismaClient } from "../../clients/db";
import JWTService from "../../services/jwt";
import { User } from ".";
interface GoogleUserInfo {
  iss: string;
  azp: string;
  aud: string;
  sub: string;
  email: string;
  email_verified: string;
  nbf: string;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
  locale: string;
  iat: string;
  exp: string;
  jti: string;
  alg: string;
  kid: string;
  typ: string;
}

const queries = {
  verifyGoogleToken: async (parent: any, { token }: { token: String }) => {
    const googleToken = token;
    const googleOuthURL = new URL("https://oauth2.googleapis.com/tokeninfo");
    googleOuthURL.searchParams.set("id_token", googleToken.toString());

    const { data } = await axios.get<GoogleUserInfo>(googleOuthURL.toString(), {
      responseType: "json",
    });
    const user = await prismaClient.user.findUnique({
      where: { email: data.email },
    });
    if (!user) {
      await prismaClient.user.create({
        data: {
          email: data.email,
          firstName: data.given_name,
          lastName: data.family_name,
          profileImageUrl: data.picture,
        },
      });
    }
    const userIndb = await prismaClient.user.findUnique({
      where: { email: data.email },
    });
    if (!userIndb) {
      throw new Error("User with this email does not found in database");
    }
    const newToken = JWTService.generateTokenForUser(userIndb);
    return newToken;
  },
};

export const resolvers = { queries };
