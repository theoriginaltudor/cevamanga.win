import { json, type MetaFunction } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { mangaList } from "~/types/managList";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async () => {
  const apiResponse = await fetch("http://localhost:3000/api/mangaList");
  const objectResponse: mangaList = await apiResponse.json();
  return json({ ...objectResponse });
};

export default function Index() {
  const { mangaList } = useLoaderData<typeof loader>();
  return (
    <div className="flex flex-col items-center pt-10 gap-10">
      <div className="flex flex-col text-xl">
        <Form>
          <label htmlFor="search">Find your manga</label>
          <input type="search" className="border" name="" id="search" />
        </Form>
      </div>
      <div className="flex gap-5 flex-wrap">
        {mangaList &&
          mangaList.map(({ id, image, title }) => (
            <div key={id} className="flex gap-5 items-center">
              <img src={image} alt="" width={80} />
              <h2 className="text-xl max-w-80 text-ellipsis">{title}</h2>
            </div>
          ))}
      </div>
    </div>
  );
}
