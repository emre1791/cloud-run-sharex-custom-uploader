import assert from 'assert';
import { Request, Response } from 'express';

import { getSecretValue } from '../util/get-secret-value';
import { requestAssert } from '../util/request-assert';

export async function requireApiKey(
  req: Request,
  _res: Response,
  next: () => void
) {
  if (process.env["NODE_ENV"] !== "production") {
    next();
    return;
  }

  const givenSecretKey = req.query.apiKey || req.header("X-API-Key");
  requestAssert(givenSecretKey, "Missing API key");
  requestAssert(typeof givenSecretKey === "string", "Invalid API key format");

  const secretKeyName = process.env["GCP_SECRET_NAME"];
  assert(secretKeyName, "GCP_SECRET_NAME is not set");

  const storedSecretKey = await getSecretValue(secretKeyName);
  requestAssert(givenSecretKey === storedSecretKey, "Invalid API key");

  next();
}
