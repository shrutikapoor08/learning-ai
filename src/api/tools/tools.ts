import { ToolNode } from "@langchain/langgraph/prebuilt";
import scoreTool  from "./scoreTool";
import { TavilySearchResults } from "@langchain/community/tools/tavily_search";


const webTool = new TavilySearchResults({ maxResults: 3 })

const tools = [scoreTool, webTool];
const toolNode = new ToolNode(tools)

export default toolNode;