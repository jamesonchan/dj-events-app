import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";
import axios from "axios";
import { API_URL } from "config";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    if (!req.headers.cookie) {
      res.status(403).json({ message: "Not Authorized" });
      return;
    }
    const { token } = cookie.parse(req.headers.cookie);
    await axios
      .get(`${API_URL}/api/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((resp) => res.status(200).json(resp.data))
      .catch((error) => res.status(403).json({ message: "User Forbidden" }));
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
