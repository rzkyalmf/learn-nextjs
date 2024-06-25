import { s3Client } from "@/utils/aws";
import { PutObjectCommand } from "@aws-sdk/client-s3";

export async function uploadFile({ key, folder, body }) {
  // 1. Siapkan file sesuai format buffer yang diminta oleh AWS/S3
  const bytes = await body.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // 2. Membuat Send Command (Command untuk upload file)
  try {
    await s3Client.send(
      new PutObjectCommand({
        Bucket: "learn-create-storage", // nama bucket, baiknya simpan di env
        Key: `${folder}/${key}`, // nama_folder/nama_file
        ContentType: body.type, // S3 membaca tipe file, supaya ketika public url di klik tidak otomatis download
        Body: buffer, // body = file yang akan di upload
      })
    );
    console.log("File uploaded successfully");
  } catch (error) {
    console.log(error);
    throw error;
  }
}
