import { getFile } from '../util/get-file';

import type { Request, Response } from "express";

export async function download(req: Request, res: Response) {
  const { assetId } = req.params;
  const file = getFile(assetId);

  const [metadata] = await file.getMetadata();

  // res.setHeader("Content-Encoding", metadata.contentEncoding);
  // res.setHeader("Content-Length", metadata.contentLength);
  res.setHeader("Content-Type", metadata.contentType);
  res.setHeader("Cache-Control", "public, max-age=86400");

  const stream = file.createReadStream();
  stream.pipe(res);
  stream.on("end", () => res.end());
}
