
import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/react";
import { useLoaderData } from "@remix-run/react";

import { prismaDatabase } from "~/prismaDatabase.server";

// export const loader = async(surveyId: LoaderFunctionArgs) => {
//   return json(await getLoaderDataSurvey(surveyId))
// }

export const loader = async ({
  params,
}: LoaderFunctionArgs) => {
  const surveyId = params.surveyId;

  return json( {surveyId});
  

}

async function getLoaderDataSurvey( surveyId: number ) {
    const survey = await prismaDatabase.survey.findUnique({
      where: {
        id: surveyId
      },
      select: {
        id: true,
        name: true,
        topic: true,
      },
    });
    return survey
  }

  const Create = () => {
    return <div>
      hi
    </div>
  }

  export default Create;

