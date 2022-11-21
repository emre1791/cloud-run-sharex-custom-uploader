import { Storage } from '@google-cloud/storage';
import assert from 'assert';
import { join } from 'path';

const client = new Storage();

export function getFile(assetId: string) {
  const storageBucket = process.env["GCP_STORAGE_BUCKET"];
  assert(storageBucket, "GCP_STORAGE_BUCKET is not set");

  const storageBasePath = process.env["GCP_STORAGE_BASE_PATH"];
  const saveLocation = join(storageBasePath || "", assetId).replace(/\\/g, "/");

  const file = client.bucket(storageBucket).file(saveLocation);

  return file;
}
