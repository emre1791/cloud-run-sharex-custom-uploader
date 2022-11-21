import { Router } from 'express';

import { requireApiKey } from '../middlewares/require-api-key';
import { download } from './download';
import { getUploaderConfig } from './get-uploader-config';
import { upload } from './upload';

export const router = Router();

router.get("/:assetId", download);

router.use("/api", requireApiKey);
router.post("/api/upload", upload);
router.get("/api/get-uploader-config", getUploaderConfig);
