// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

const prisma =
    global.prisma ||
    new PrismaClient()

if (process.env.NEXT_PUBLIC_APP_ENV !== 'production') global.prisma = prisma

export default prisma;