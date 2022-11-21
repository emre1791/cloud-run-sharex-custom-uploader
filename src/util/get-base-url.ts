import { Request } from 'express';

export function getBaseUrl(req: Request) {
  const protocol =
    req.header("X-Forwarded-Proto") || req.secure ? "https" : "http";
  const host = req.header("X-Forwarded-Host") || req.header("Host");

  return `${protocol}://${host}`;
}
