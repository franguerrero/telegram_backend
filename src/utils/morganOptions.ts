import { Options } from "morgan";
import { Request, Response } from "express";
import logger from "./logger";

export const morganOptions: Options<Request, Response> = {
  stream: {
    write(message: string) {
      logger.info(message.trim());
    },
  },
};
