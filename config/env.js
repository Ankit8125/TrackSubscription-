import { config } from "dotenv";

config({ path: '.env' })
// Extracts all the env variables

export const { PORT, DB_URI } = process.env