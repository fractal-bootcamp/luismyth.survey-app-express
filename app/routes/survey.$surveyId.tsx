import type { LoaderFunctionArgs } from "@remix-run/node";
import { Link, json } from "@remix-run/react";
import { useLoaderData } from "@remix-run/react";

import { prismaDatabase } from "~/prismaDatabase";


async function getLoaderData(surveyId: string) {
    const surveyIdInt: number = +surveyId
    const survey = await prismaDatabase.survey.findUnique({
        where: {
            id: surveyIdInt
        },
        select: {
            id: true,
            name: true,
        },
        },
    );
    return survey
}

export const loader = async ({
  params,
}: LoaderFunctionArgs) => {
  console.log("server side")
  console.log("params.surveyId:", params.surveyId)
  return json(
    await getLoaderData(params.surveyId!)
  )
}

function SurveyInfoDisplay() {
    const survey = useLoaderData<typeof loader>();
    console.log(survey)
    return(
        <div>
            Welcome to survey info for Survey number {survey!.id}
            <br />
            {survey!.name}
        </div>
    )
}


export default function Index() {
  console.log("client side")
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <div>
        <SurveyInfoDisplay />
      </div>
      <div>
          <Link to="/" >See all</Link>
      </div>
    </div>
  );
}