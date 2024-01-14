import mongoose, { Document, Schema } from "mongoose";

const schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    rootUrl: { type: String, required: true },
    image: { data: { type: Buffer, required: true }, contentType: { type: String, required: true } },
  },
  { collection: "admin_clients" }
);

export interface IClient extends Document {
  name: string;
  description: string;
  rootUrl: string;
  image: { data: any; contentType: string };
}

export default mongoose.model<IClient>("admin_Client", schema);


