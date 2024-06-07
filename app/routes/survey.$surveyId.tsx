import type { LoaderFunctionArgs } from "@remix-run/node";
import { Link, json } from "@remix-run/react";
import { useLoaderData } from "@remix-run/react";

import { prismaDatabase } from "~/prismaDatabase.server";


export const loader = async ({
  params,
}: LoaderFunctionArgs) => {
  console.log("server side")
  return json(
    await prismaDatabase.survey.findMany()
  )
}

export function ListSurveys() {
  const data = useLoaderData<typeof loader>();
  return(
    <ul>
      {data.map((survey) => (
        <li key={survey.id}>{survey.name}</li>
      ))}
    </ul>
  )
}

export function HowManySurveys() {
  const surveys = useLoaderData<typeof loader>();
  return (
    <div>
      <p>The Loader has found {surveys.length} surveys are recorded</p>
      <ListSurveys />
    </div>
  )
}



export default function Index() {
  console.log("client side")
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <div>

      <h1>Welcome to Remix</h1>
      <Link to="/create" >Create</Link>
      </div>
      <HowManySurveys />
    </div>
  );
}