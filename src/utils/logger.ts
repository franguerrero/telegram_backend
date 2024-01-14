import winston from "winston";
import path from "path";

const user = "System";
const logger = winston.createLogger({
  // You can also comment out the line above and uncomment the line below for JSON format
  // format: format.json(),
  levels: winston.config.syslog.levels,
  transports: [
    new winston.transports.Console({
      level: "debug",
      format: winston.format.combine(
        winston.format.label({ label: "TELEGRAMBOT_OPOJA" }), // path.basename(process.mainModule.filename) }),
        winston.format.simple(),
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.json(),
        winston.format.prettyPrint(),
        winston.format.printf(
          (info: any) => `${info.timestamp} - ${info.level} [${info.label}] [${info.user || "System"}]: ${info.message}`
        )
      ),
    }),
  ],
});

export default logger;
