/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: `${process.env.S3BUCKETNAME}.s3.${process.env.S3BUCKETREGION}.amazonaws.com`,
        port: "",
        pathname: `/*`,
      },
    ],
  },
}

export default nextConfig
