import assert from 'assert';

import { getBaseUrl } from '../util/get-base-url';
import { getFile } from '../util/get-file';
import { makeRandomString } from '../util/make-random-string';
import { requestAssert } from '../util/request-assert';

import type { Request, Response } from "express";
export async function upload(req: Request, res: Response) {
  requestAssert(
    typeof req.body === "object" && req.body instanceof Buffer,
    "Invalid request body"
  );

  const contentType = req.header("Content-Type");
  requestAssert(contentType, "Content-Type is not set");

  const assetId = makeRandomString(5);
  const baseUrl = getBaseUrl(req);

  const file = getFile(assetId);

  const [exists] = await file.exists();
  assert(!exists, "File already exists");

  await file.save(req.body, {
    gzip: true,
    metadata: {
      contentType: contentType,
      cacheControl: "public, max-age=31536000",
    },
  });

  res.json({
    filename: assetId,
    url: `${baseUrl}/${assetId}`,
    thumbnail_url: `${baseUrl}/thumbnails/${assetId}`, // TODO
    deletion_url: `${baseUrl}/api/delete?assetId=${assetId}`, // TODO
  });
}
