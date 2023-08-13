import type { NextApiRequest, NextApiResponse } from "next";
import httpProxy, { ProxyResCallback } from "http-proxy";
import Cookies from "cookies";
type Data = {
  message: string;
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
  if (req.method !== "POST") {
    return res.status(404).json({ message: "not support" });
  }

  return new Promise(() => {
    req.headers.cookie = "";
    // handler response
    const handleLoginResponse: ProxyResCallback = (proxyRes, req, res) => {
      let body = "";
      let result: boolean = false;

      proxyRes.on("data", function (chunk) {
        body += chunk;
      });
      proxyRes.on("end", function () {
        let userID = JSON.parse(body).id;
        try {
          const { accessToken, refreshToken } = JSON.parse(body);
          // let userID = id;
          const cookies = new Cookies(req, res, {
            secure: process.env.NODE_ENV !== "development",
          });
          cookies.set("access_token", accessToken, {
            httpOnly: true,
            sameSite: "lax",
          });
          cookies.set("refresh_token", refreshToken, {
            httpOnly: true,
            sameSite: "lax",
          });
          result = true;
        } catch (error) {
          result = false;
        }

        return result
          ? (res as NextApiResponse).status(200).json({ userID })
          : (res as NextApiResponse).status(500).json({ message: "error !" });
      });
    };
    proxy.on("proxyRes", handleLoginResponse);
    proxy.web(req, res, {
      target: process.env.API_URL,
      changeOrigin: true,
      selfHandleResponse: true,
    });
  });
}
