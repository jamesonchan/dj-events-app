import axios, { AxiosError, AxiosResponse } from "axios";
import { API_URL } from "config";
import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { username, email, password } = req.body;
    try {
      const strapiRes = await axios.post(`${API_URL}/api/auth/local/register`, {
        username,
        email,
        password,
      });

      // set cookie
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", strapiRes.data.jwt, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          maxAge: 60 * 60 * 24 * 7, // 1 week
          sameSite: "strict",
          path: "/",
        })
      );
      res.status(200).json(strapiRes.data);
    } catch (error: any) {
      res
        .status(error.response.data.error.status)
        .json(error.response.data.error.message);
    }

    // res.status(200).json(strapiRes);
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
