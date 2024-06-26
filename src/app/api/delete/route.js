import { deleteFile } from "@/lib/deleteFile";
import { prisma } from "@/utils/prisma";

export async function DELETE(req) {
  // ambil folder dan key dari client
  const { folder, key } = await req.json();

  // Melakukan delete data file didalam prisma
  await prisma.file.delete({
    where: {
      id: folder,
    },
  });

  // Melakukan delete file didalam storage
  await deleteFile(folder, key);
  console.log({ folder, key });

  return Response.json({ message: "File deleted succesfully" });
}
