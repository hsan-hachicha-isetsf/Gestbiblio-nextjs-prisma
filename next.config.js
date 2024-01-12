/** @type {import('next').NextConfig} */
const nextConfig = {

    images:{
        domains:["res.cloudinary.com","res-console.cloudinary.com"]
        },
    env:{
        URL : "https://gestbiblio-nextjs-prisma.vercel.app/"
        } 

}

module.exports = nextConfig
