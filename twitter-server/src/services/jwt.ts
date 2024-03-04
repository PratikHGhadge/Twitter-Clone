import { User } from "@prisma/client";
import { prismaClient } from "../clients/db";
import JWT, { Secret } from "jsonwebtoken";

// Define the type of process.env.JWT_SECRET
const jwtSecret: Secret = process.env.JWT_SECRET as Secret;

class JWTService {
  public static generateTokenForUser(user: User) {
    const payload = {
      id: user?.id,
      email: user?.email,
    };
    const token = JWT.sign(payload, jwtSecret);
    return token;
  }
}

export default JWTService;
