import { PrismaClient } from '@prisma/client';
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export const QueryLivPopulatedPagination=async(request)=>{
    const page_str = request.nextUrl.searchParams.get("page");
    const limit_str = request.nextUrl.searchParams.get("limit");
    const page = page_str ? parseInt(page_str, 10) : 1;
    const limit = limit_str ? parseInt(limit_str, 10) : 10;
    const skip = (page - 1) * limit;
    try {
        if (!request.nextUrl) {
            throw new Error("nextUrl is undefined");
        }
    const list1 = await prisma.livres.findMany(
    {
    skip,
    take: limit,
    include: {
    specialites: {
    select: {
    id : true,
    nomspecialite: true,
    },
    },
    editeurs: {
    select: {
    id : true,
    maisonedit: true,
    },
    },
    livre_auteur: {
    include: {
    auteurs: {
    select: {
    id : true,
    nomauteur: true,
    },
    }
    }
    }
    }
    }
    )
    return list1
    } catch (error) {
    console.error(error)
    }
    finally{
    prisma.$disconnect()
    }
    }
export const QueryLivPopulated=async()=>{
    try {
    const list1 = await prisma.livres.findMany({
    include: {
    specialites: {
    select: {
    id : true,
    nomspecialite: true,
    },
    },
    editeurs: {
    select: {
    id : true,
    maisonedit: true,
    },
    },
    livre_auteur: {
    include: {
    auteurs: {
    select: {
    id : true,
    nomauteur: true,
    },
    }
    }
    }
    }
    })
    return list1
    } catch (error) {
    console.log(error)
    }
    finally{
    prisma.$disconnect()
    }
    }
    

export const QueryLiv=async()=>{
try {
const listl=await prisma.livres.findMany();
return listl
} catch (error) {
console.log(error)
}
finally{
prisma.$disconnect()
}
}
export async function GET(request) {
const livres = await QueryLivPopulatedPagination(request)
return NextResponse.json(livres);
}

// CREATE DATA
export async function POST(request) {
    try {const json = await request.json();
    const livres = await prisma.livres.create({
    data: json,
    });
    return NextResponse.json(livres);
    } catch (error) {
    return new NextResponse(JSON.stringify(error), {
    status: 500,
    headers: { "Content-Type": "application/json" },
    });
    }
    }
    