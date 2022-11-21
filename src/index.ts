import 'express-async-errors';

import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';

import { catchAsyncErrors } from './middlewares/catch-async-errors';
import { router } from './routes';

dotenv.config();

const app = express();

app.use(bodyParser.raw({ inflate: true, type: ["*/*"], limit: "250mb" }));

app.use(router);
app.use((_req, res) => res.status(404).send("Not Found"));

app.use(catchAsyncErrors);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
