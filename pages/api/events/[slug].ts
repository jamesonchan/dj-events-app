// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Events } from "types";

const { events } = require("./data.json");

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const evt = events.filter((ev: Events) => ev.slug === req.query.slug);
  if (req.method === "GET") {
    res.status(200).json(evt);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} is not allow` });
  }
}
