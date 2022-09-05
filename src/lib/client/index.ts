import { PrismaClient } from "@prisma/client";
import { PrismaClientValidationError } from '@prisma/client/runtime';

export const client = new PrismaClient()
export default { PrismaClientValidationError }
