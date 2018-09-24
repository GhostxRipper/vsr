const { parse } = require("url");
const https = require("https");
const http = require("http");
const METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE"];

const fetch = method => (
  url,
  body,
  headers = { "Content-Type": "application/json" }
) =>
  new Promise((resolve, reject) => {
    const { protocol, hostname, path } = parse(url);
    const { request } = protocol.slice(0, -1) === "https" ? https : http;

    const option = {
      protocol,
      method,
      hostname,
      path,
      headers
    };

    const data = [];
    const req = request(option, res => {
      res.on("data", chunk => data.push(chunk));
      res.on("end", () => {
        const content = Buffer.concat(data).toString();
        if (res.getHeader("content-type") === "application/json") {
          resolve({ res, data: JSON.parse(content) });
        } else resolve({ res, data: content });
      });
    }).on("error", e => reject(e));

    if (body && method !== "GET") req.write(body);
    req.end();
  });

module.exports = METHODS.reduce(
  (acc, method) => ({ ...acc, [method.toLocaleLowerCase()]: fetch(method) }),
  {}
);
