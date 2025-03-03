import "dotenv/config";
import { get } from "env-var";

export const envs = {
    PORT: get("PORT").required().asPortNumber(),
    JWT_SECRET: get("JWT_SECRET").required().asString(),
    AI_KEY: get("AI_KEY").required().asString(),
    API_IMG: get("API_IMG").required().asString(),

    SEND_EMAIL: get("SEND_EMAIL").default("false").asBool(),
    MAILER_SERVICE: get("MAILER_SERVICE").required().asString(),
    MAILER_EMAIL: get("MAILER_EMAIL").required().asString(),
    MAILER_SECRET_KEY: get("MAILER_SECRET_KEY").required().asString(),
    WEBSERVICE_URL: get("WEBSERVICE_URL").required().asString(),
};
