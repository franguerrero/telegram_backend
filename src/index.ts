import fs from "fs";
import https from "https";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";

import config from "./config/config";
import clientRouter from "./routes/client.route";

import morgan from "morgan";
import moment from "moment-timezone";
import logger from "./utils/logger";
import { morganOptions } from "./utils/morganOptions";

import botRoutes from './routes/BotRoutes';

const app = express();

/*———— Morgan Timezone ————*/
morgan.token("date", () => {
  return moment().tz("Europe/Madrid").format();
});
morgan.format(
  "fgaFormat",
  ':remote-addr [:date] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"'
);
/*———— API Logger ————*/
app.use(morgan("fgaFormat", morganOptions));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: config.corsOrigins, credentials: true }));



app.use("/opoapi", clientRouter);
app.get("/", async (req, res) => {
  res.json({ OK: true });
});
app.get("/version", async (req, res) => {
  res.json({ version: "v1.0" });
});

app.use('/bot', botRoutes);

logger.info("Connecting Mongo...");
mongoose.connect(config.mongodbConnectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (error) => logger.error("connection error:", error));
db.once("open", function () {
  

  app.listen(config.port, () => {
    logger.info(`Server listening at http://localhost:${config.port}`);
  });
});
