import { Link } from "@remix-run/react";
import { expressPort } from "./_index";
import { useState } from "react";

export const postSurvey = async ({ name }: NewSurvey) => {
  const response = await fetch (`http://localhost:${expressPort}/insert`, {
    method: "POST",
    mode: "no-cors",
    cache: "no-cache",
    body: JSON.stringify(name)
    }
  )
// full "response" is a massive sprawling object, .json() gives us the most salient part of it somehow
const responseJson = await response.json()
console.log("postSurvey function called. Response received was:", response)
}

type NewSurvey = {
  name: string;
}

export default function CreateSurveyForm () {
  const [submittedValue, setSubmittedValue] = useState("")
  console.log("submittedValue is:", submittedValue)
  return (
    <div>
      <input type="text" value = {submittedValue} onChange={(e) => {setSubmittedValue(e.target.value)}}/>
      <button type="submit" onClick={
        ()=>{
          console.log("Submit button has been clicked, with value:", submittedValue);
          postSurvey({name: submittedValue})
        }
      }
      >
        Submit
      </button>
      <br />
      <br />
      <Link to = "/"> Back to all surveys </Link>

    </div>
  )
}
