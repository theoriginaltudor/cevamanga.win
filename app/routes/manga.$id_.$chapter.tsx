import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { mangaChapter } from "~/types/mangaChapter";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const apiResponse = await fetch(
    new URL(
      `http://localhost:3000/api/manga/${params.id}/${params.chapter}` +
        params.id
    )
  );
  const objectResponse: mangaChapter = await apiResponse.json();
  return json({ ...objectResponse });
};

export default function MangaChapter() {
  const { images } = useLoaderData<typeof loader>();
  return (
    <>
      {images.map((page) => (
        <img src={page.image} className="w-full" />
      ))}
    </>
  );
}
