import dotenv from "dotenv"//dotenv :Loads variables from .env file into process.env.
import { z } from "zod"//Zod: Validates data at runtime.
dotenv.config()
// What does dotenv.config() do?
//  Reads your .env file
// Loads values into process.env

const envSchema=z.object({
    PORT :z.coerce.number().default(3000),// coerce basically converts the value to a number process.env.PORT is STRING "3000" coerce.number() converts it → 3000 (number)

    DB_URL : z.string().min(1,"Database URL is required"),//minimum 1 character ensures url not empty
    JWT_SECRET: z.string().min(1,"JWT secret is required")// alternate => z.string().nonempty("Database URL is required")

})
export const env = envSchema.parse(process.env) 
 
// What does parse() do?
// parse() does FOUR things at once:
//  1. Validates data : Checks if process.env matches your schema.
//  2. Converts types (because of coerce)
//  3. Applies defaults
//  4. Returns CLEAN typed object
// If validation FAILS?parse() immediately throws error and crashes app.