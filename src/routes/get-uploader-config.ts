import assert from 'assert';
import { Request, Response } from 'express';
import { readFileSync } from 'fs';
import { join } from 'path';

import { getBaseUrl } from '../util/get-base-url';
import { getSecretValue } from '../util/get-secret-value';

const config = JSON.parse(
  readFileSync(join(__dirname, "../../custom-uploader.sxcu.json"), "utf8")
);

export async function getUploaderConfig(req: Request, res: Response) {
  const secretName = process.env["GCP_SECRET_NAME"];
  assert(secretName, "GCP_SECRET_NAME is not set");

  const baseUrl = getBaseUrl(req);
  const apiKey = await getSecretValue(secretName);

  config.Name = `Cloud Run Uploader (${baseUrl})`;
  config.RequestURL = `${baseUrl}/api/upload`;
  config.Headers["X-API-Key"] = apiKey;

  res.send(config);
}
