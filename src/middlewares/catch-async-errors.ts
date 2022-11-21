import { Request, Response } from 'express';

import { RequestAssertionError } from '../util/request-assert';

export async function catchAsyncErrors(
  err: unknown,
  _req: Request,
  res: Response,
  _next: () => void
) {
  if (err instanceof RequestAssertionError) {
    res.status(400).send(err.message);
  } else {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
}
