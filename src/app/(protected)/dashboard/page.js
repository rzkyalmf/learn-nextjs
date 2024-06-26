import { UploadData } from "@/components/uploaddata";
import { DeleteBtn } from "@/components/deleteBtn";
import Image from "next/image";

export default async function Page() {
  const res = await fetch("http://localhost:3000/api/files", {
    cache: "no-store",
  });
  const allFiles = await res.json();
  const data = allFiles.data;

  const publicUrl =
    "https://pub-ab7c0457350c44929f23932327db41ab.r2.dev/learn-create-storage";

  return (
    <main className="max-w-xl m-auto my-6 space-y-4">
      <UploadData />
      <section className="space-y-4 ">
        {data.map((item) => {
          return (
            <div key={item.key}>
              <Image
                src={`${publicUrl}/${item.id}/${item.key}`}
                width={200}
                height={200}
                alt=""
              />
              <div>{item.key}</div>
              <DeleteBtn folder={item.id} fileKey={item.key} />
            </div>
          );
        })}
      </section>
    </main>
  );
}
