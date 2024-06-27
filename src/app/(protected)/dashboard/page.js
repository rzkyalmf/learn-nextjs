import { UploadData } from "@/components/uploaddata";
import { ItemFile } from "@/components/itemfile";

export default async function Page() {
  const res = await fetch("http://localhost:3000/api/files", {
    cache: "no-store",
  });
  const allFiles = await res.json();
  const data = allFiles.data;
  // console.log({ data });

  return (
    <main className="max-w-xl m-auto my-6 space-y-4">
      <UploadData />
      <section className="space-y-4 ">
        {data.map((item) => {
          return <ItemFile key={item.key} id={item.id} fileKey={item.key} />;
        })}
      </section>
    </main>
  );
}
