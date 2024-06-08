import { Link, json } from "@remix-run/react";
import { useEffect, useState } from "react";

export const expressPort = 4001

export const getSurveys = async () => {
  const data = await fetch (`http://localhost:${expressPort}/`,
    
    // {mode: "no-cors"}

  )
  // cross-resource origin sharing
  // "when I'm a website, I should only be able to interact with other websites explicitly"
  // CORS is a webscanner that prevents you from interacting with other websites
  // in this case, it might be upset that I'm interacting with different websites

  const surveys = (await data.json()) as {
    surveys: Surveys
  }

  return surveys
}

type Surveys = {
  name: string;
  id: number;
}[]

function HowManySurveys( { surveysLength } : {surveysLength: number } ) {
  return (
    <div>
      <p>The Loader has found {surveysLength} surveys are recorded</p>
    </div>
  )
}

export default function Index() {
  const [surveys, setSurveys] = useState<Surveys>([])

  useEffect(
    () => {

      const loadData = async () => {
        const data = await getSurveys();
        setSurveys(data.surveys);
      };
      loadData()
    }, [])

  console.log("Client side is live.")
  console.log("surveys is:", surveys)

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Survey Orangutan</h1>
      <div>
      <Link to="/create" >Create</Link>
      </div>
      <HowManySurveys surveysLength = {surveys.length} />

      {surveys.toReversed().map((survey) => (
        <div key = {survey.id}>
          <Link to = {`/survey/${survey.id}`}>
            <b>Survey #{survey.id}:  </b>
            {survey.name}
          </Link>
        </div>
      ))}

    </div>
  );
}