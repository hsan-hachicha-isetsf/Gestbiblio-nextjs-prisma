import { PrismaClient } from '@prisma/client';
import { NextResponse } from "next/server";
const prisma = new PrismaClient();
export const QuerySpecialites=async()=>{
    try {
    const spec=await prisma.specialites.findMany();
    return spec
    } catch (error) {
    console.log(error)
    }
    finally{
    prisma.$disconnect()
    }
    }
    export async function GET() {
    const specialites = await QuerySpecialites()
    return NextResponse.json(specialites);
    }

    // CREATE DATA
export async function POST(request) {
    try {const json = await request.json();
    const specialite = await prisma.specialites.create({
    data: json,
    });
    return NextResponse.json(specialite);
    } catch (error) {
    return new NextResponse(JSON.stringify(error), {
    status: 500,
    headers: { "Content-Type": "application/json" },
    });
    }
    }