import { config } from "dotenv";

config({ path: '.env' })
// Extracts all the env variables

export const { PORT } = process.env