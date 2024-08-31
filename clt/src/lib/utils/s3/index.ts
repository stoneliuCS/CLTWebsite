import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3"

const s3Client = () => {
  const region = process.env.S3BUCKETREGION
  const awsPublicKey = process.env.PUBLIC_KEY_AWS
  const awsSecretKey = process.env.SECRET_KEY_AWS
  if (!region) throw new Error("aws region undefined")
  if (!awsPublicKey) throw new Error("aws public key undefined")
  if (!awsSecretKey) throw new Error("aws public key undefined")

  const s3Client = new S3Client({
    region: region,
    credentials: {
      accessKeyId: awsPublicKey,
      secretAccessKey: awsSecretKey,
    },
  })
  return s3Client
}

export async function uploadS3(file: File) {
  const bucket = process.env.S3BUCKETNAME
  const region = process.env.S3BUCKETREGION
  if (!region) throw new Error("aws region undefined")
  if (!bucket) throw new Error("aws region undefined")

  const fileKey = `${Date.now()}-${file.name}`
  const fileBuffer = await file.arrayBuffer()
  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: fileKey,
    Body: Buffer.from(fileBuffer),
    ContentType: file.type,
  })
  try {
    const client = s3Client()
    // Upload the file to S3
    await client.send(command)
    // Generate the URL of the uploaded file
    const url = `https://${bucket}.s3.${region}.amazonaws.com/${fileKey}`
    return url
  } catch (error) {
    console.error("Error uploading file:", error)
    throw new Error("Error uploading file to S3")
  }
}
