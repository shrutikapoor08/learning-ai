// Score tool  
import { tool } from "@langchain/core/tools";
import { z } from "zod";

const scoreTool = tool((input) => {
  // call api to get score
  // return score
if(input.metric === "fun"){
  return 70;
}}, {
    name: "score", 
    description: "Returns a score based on the metric. High score - 71 - 100, Medium score - 41 - 70 , Low score - 0 - 40",
    schema: z.object({
        address: z.string().describe("Address of the property"),
        metric: z.string().describe("Metric to score the property on"),
    })
})

export default scoreTool;
