import fs from "fs";
import { Request, Response } from "express";
import { IncomingForm } from "formidable";
import Client, { IClient } from "../models/client.model";
import logger from "../utils/logger";

export default {
  async adminLoadClients(req: Request, res: Response) {
    try {
      const clients = await Client.find().exec();
      res.json({ success: true, clients });
    } catch (ex: any) {
      logger.error(ex.toString());
      res.status(ex.status || 400).json({ success: false, error: ex.toString() });
    }
  },
  async adminLoadClientInfo(req: Request, res: Response) {
    try {
      const client = await Client.findById(req.params.clientId).exec();
      res.json({ success: true, client });
    } catch (ex: any) {
      logger.error(ex.toString());
      res.status(ex.status || 400).json({ success: false, error: ex.toString() });
    }
  },
  async adminAddClient(req: Request, res: Response) {
    const form = new IncomingForm();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        logger.error(err);
        res.status(400).json({ success: false, error: err.toString() });
      } else {
        try {
          

          const client = new Client({
            
            clientId: fields.clientId,
            name: fields.name,
            description: fields.description,
            rootUrl: fields.rootUrl,
            image: { data: fs.readFileSync(files.file.path), contentType: files.file.type },
            groups: (fields.groups as string).split(","),
          });
          await client.save();

          res.json({ success: true });
        } catch (ex) {
          logger.error(ex.toString());
          res.status(ex.status || 400).json({ success: false, error: ex.toString() });
        }
      }
    });
  },
  async adminUpdateClient(req: Request, res: Response) {
    const form = new IncomingForm();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        logger.error(err);
        res.status(400).json({ success: false, error: err.toString() });
      } else {
        try {
          const client: any = {
            
            clientId: fields.clientId,
            name: fields.name,
            description: fields.description,
            rootUrl: fields.rootUrl,
            groups: (fields.groups as string).split(","),
          };
          if (files.file) {
            client.image = { data: fs.readFileSync(files.file.path), contentType: files.file.type };
          }
          await Client.findByIdAndUpdate(fields._id, client);

          res.json({ success: true });
        } catch (ex) {
          logger.error(ex.toString());
          res.status(ex.status || 400).json({ success: false, error: ex.toString() });
        }
      }
    });
  },
  async adminDeleteClient(req: Request, res: Response) {
    try {
      const result = await Client.findByIdAndDelete(req.params.clientId).exec();
      res.json({ success: true });
    } catch (ex) {
      logger.error(ex.toString());
      res.status(ex.status || 400).json({ success: false, error: ex.toString() });
    }
  },
};
