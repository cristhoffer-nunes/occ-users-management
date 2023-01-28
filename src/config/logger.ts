import { createLogger, transports, format } from "winston"

export const loggerGetProfile = createLogger({
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.printf(({ timestamp, level, message }) => {
          return `[${timestamp}] ${level}: ${message}.`
        })
      ),
    }),
    new transports.File({
      dirname: "logs",
      filename: "getProfiles.log",
      format: format.combine(format.json()),
    }),
  ],
  format: format.combine(format.metadata(), format.timestamp()),
})

export const loggerUpdateProfile = createLogger({
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.printf(({ timestamp, level, message }) => {
          return `[${timestamp}] ${level}: ${message}.`
        })
      ),
    }),
    new transports.File({
      dirname: "logs",
      filename: "updateProfiles.log",
      format: format.combine(format.json()),
    }),
  ],
  format: format.combine(format.metadata(), format.timestamp()),
})
