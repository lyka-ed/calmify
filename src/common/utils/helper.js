import { randomBytes } from "crypto";
import jsonwebtoken from "jsonwebtoken";
import { ENVIRONMENT } from "../config/environment.js";
import { json } from "express";

export function generateRandomString(length) {
  return randomBytes(length).toString("hex");
}

export function signToken(payload) {
  return jsonwebtoken.sign(payload, ENVIRONMENT.JWT.SECRET, {
    expiresIn: ENVIRONMENT.JWT.EXPIRES_IN,
    algorithm: "HS256",
  });
}

export function decodeToken(token) {
  return jsonwebtoken.verify(
    token,
    ENVIRONMENT.JWT.SECRET,
    {
      algorithms: "HS256",
    },
    (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          throw new Error("Session expired, please login again");
        }
        throw new Error("Invalid auth token");
      }

      return decoded;
    }
  );
}
