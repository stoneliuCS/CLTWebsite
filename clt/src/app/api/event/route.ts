import { auth } from "@/lib/utils/auth";
import { NextApiRequest, NextApiResponse } from "next";

export async function POST(req : NextApiRequest, res : NextApiResponse) {
    const session = await auth()
    if (!session) return res.status(401)
    console.log(req, "HIT")
    return res.json("Got it")
}