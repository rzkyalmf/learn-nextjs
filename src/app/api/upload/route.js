import { uploadFile } from "@/lib/uploadFile";
import { prisma } from "@/utils/prisma";
import { nanoid } from "nanoid";

export async function POST(req) {
  // 1. Upload File, get formData melalui server.
  const formData = await req.formData();
  const file = formData.get("file");
  const author = formData.get("author");

  // Generate ID, supaya id langsung bisa di simpan menjadi nama folder.
  const id = nanoid();

  // Jika file atau author tidak di isi maka return...
  if (!author || file.size === 0) {
    return Response.json(
      { message: "All field must be filled" },
      { status: 400 }
    );
  }

  try {
    // 2. Menyimpan file kedalam storage Terlebih dahulu
    await uploadFile({ folder: id, key: file.name, body: file });

    // 3. Lalu menyimpan data file kedalam Database
    const createFile = await prisma.file.create({
      data: {
        id,
        key: file.name,
        author,
      },
    });

    return Response.json(
      { message: "Upload Success", data: createFile },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      { message: "Upload Failed, Server Error" },
      { status: 500 }
    );
  }
}
