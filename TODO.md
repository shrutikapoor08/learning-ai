


# TODO

## Jan 4, 2025
### Recommendation engine
- ✅Step 1: Create a dataset for liked / disliked properties.
- ✅Step 2: Ensure dataset has relevant fields - city, address, number of bedroom, bathrooms, nice to haves.

## Jan 5, 2025
### Create dataset
- ✅Step 1: Create a dataset for liked / disliked properties.
- ✅Step 2: Ensure dataset has relevant fields - city, address, number of bedroom, bathrooms, nice to haves.

## Jan 20, 2025
- ✅Step 1: Find a database that is compatible with vector data. -> Convex. 
-  ✅Step 2: Create vector embeddings for properties (text). Use LangChain to generate embeddings. 
-  ✅Step 2.1: create vector embeddings for json. 
- ✅Step 3: Create table in database and create schema. 
  - ✅Step 3.1: Define a vector index

- ✅Step 4: store vector embeddings in database. 
- ✅Step 5: Perform vector Similarity search
  

### Database choices. 

#### Turso
1. Need to use drizzle/prisma to avoid writing SQL. 

Pro - 
Cons - 
1. Hard to do as-compared to Convex. 

#### Convex
1. Use`ctx.vectorSearch`
2. Use within a convex action. 

Pro - 
1. No need to write SQL
1. Familiar codebase. 

### Embeddings
- Embeddings create vector representations of a piece of text. 
- OpenAI provides embeddings. 
- `embed_documents` takes multiple texts as input. 


## Later
- Step 2.1: Parse "nice to haves" to json from the property listing.



## ✅ Jan 22, 2025 - Create vector embeddings for JSON.
## ✅Jan 23, 2025 - CSS What's new in 2024. 
## ✅Jan 24, 2025 ✅ Create vector index. ✅Create table in database and create schema. ✅Step 3.1: ✅Define a vector index. ✅ Fetch similarity object from similarity search -> Convex vector_search for us. 
## Jan 27, 2025 
  - [✅] put property in Convex DB
  - [✅] generate similar properties (doing a test of the code so far)
## ✅Jan 28, 2025 - Fetch similar properties from Zillow API
## ✅Jan 29, 2025 - Render similar properties on the page


## Season 2 - FEBRUARY - UI Season - Fix the UI 
**MVP Items**
-  ✅ ErrorBoundary in React
-  ✅ Code refactor
-  ✅ Loader
-  ✅ Implement pills
-  ✅ Implement property details page (vTanstack router)
-  ✅ Implement Property card
-  ✅ State management - Context, Redux, Tanstack Query  - tanstack query!  
- ✅ Implement pagination / infinite scrolling for loading more properties. 
- ✅ Code refactor (Feb 20)
- ✅ Improve Loader component (Feb 20)
-   ✅ Design property details page -  Good first issue
-  ✅ Design homepage - Good first issue
-  ✅ Design property card -  Good first issue
-  ✅  Fetch property from the DB based on its recommendation id.
-  - ⏱️[]✅ In progress - Show recommendation properties in the UI


## Season 3 - Build an Agent with LangGraph and Convex
- ✅ Day 4: Parse nice to haves (walk score) and send to agent
- ✅Day 5: Agent calculates walk score and other nice to haves


## Season 4 - Making Agents Robust
  - Create a tool that parses subjective text to quantifiable information, such as parse "fun neighborhood" into proximity to restaurants, bars, things to do, etc. 
  - Create a proximity tool that uses an address and gives a proximity score, such as walk score. 
  - Parse scores(high and low) and show as a "likeability" score for each property.

UI Updates - 
  - Rate properties based on nice to haves
  - "Properties we think you will love"
  - "Properties in your budget / preferences but outside of your area"

**Bug Fixes**
- [] Do not call llm api multiple times on
- [] Insert / Update based on whether a property exists or not in the database.  
- [] It should not show properties outside the budget. 

**Performance Optimizations**
- [] Server side rendering 
- [] Add React compiler
- [] Lazy load images
- [] React scan https://github.com/aidenybai/react-scan


 
**Nice to haves**
- [] tags based on priority of preference, consider I am keen to look for a specific layout I'd rank it 1 , 2nd price, 3rd location
- [] Add zillow link for each property. 
- [] View Transitions API for Property Details cards. 
- [] Something you need is sticky input... so when you scroll, you can still go back
- Implement Carousel component
- [] Write test cases. 

**Tech Stack Improvements to the app**
- [] Improve data fetching through React query
- [] Move to TS
- [] Move to TailwindCSS V4

