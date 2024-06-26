import { s3Client } from "@/utils/aws";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";

export async function deleteFile(folder, key) {
  // 1. Membuat Send Command (Command untuk delete file)
  try {
    await s3Client.send(
      new DeleteObjectCommand({
        Bucket: "learn-create-storage",
        Key: `${folder}/${key}`,
      })
    );
    console.log("File deleted successfully");
  } catch (error) {
    console.log(error);
    throw error;
  }
}
