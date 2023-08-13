import type { NextApiRequest, NextApiResponse } from "next";
import httpProxy, { ProxyResCallback } from "http-proxy";
import Cookies from "cookies";
type Data = {
  name: string;
};
const proxy = httpProxy.createProxyServer();
export const config = {
  api: {
    bodyParser: false,
  },
};
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  return new Promise(() => {
    let result: boolean = false;
    const a = async () => {
      try {
        // let userID = id;
        const cookies = new Cookies(req, res, {
          secure: process.env.NODE_ENV !== "development",
        });
        cookies.set("access_token", "", {
          overwrite: true,
        });
        cookies.set("refresh_token", "", {
          overwrite: true,
        });
        result = true;
      } catch (error) {
        result = false;
      }

      return result
        ? (res as NextApiResponse).status(200).json({ message: "logout !" })
        : (res as NextApiResponse).status(500).json({ message: "error !" });
    };
    a();
  });
}
