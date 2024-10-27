import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { mangaChapter } from "~/types/mangaChapter";
import { domain } from "./manga._index";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const apiResponse = await fetch(
    new URL(`${domain}/api/manga/${params.id}/${params.chapter}`)
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
