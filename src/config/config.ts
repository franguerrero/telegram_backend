import logger from "../utils/logger";

const resolveConfig = (NODE_ENV?: string) => {
  if (NODE_ENV === "production") {
    logger.info("conf -> prod");

    return {
      port: 3030,
      corsOrigins: "",
      mongodbConnectionString:
        "mongodb://URLAZURE",
     
    };
  }

 
  logger.info("conf -> local");

  return {
    port: 3030,
    corsOrigins: "http://localhost:3000",
    mongodbConnectionString: "mongodb://mongo-db:27017/iw",
    
  };
};

export default resolveConfig(process.env.NODE_ENV);
