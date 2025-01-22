


# TODO
✅ Add Tailwind
✅ Make it look pretty
✅  add address as a heading.
(LATER) add a slideshow of photos.
✅ price should be in a bigger font
✅  save button should be smaller and should be a heart button
 ✅ Add save functionality.
 ✅ Save items to the DB.
(FUTURE VIDEO) Fetch from DB.

 ----
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
- Step 2: Create vector embeddings for properties. Use LangChain to generate embeddings. 
- Step 3: Create table in database. 
- Step 4: store vector embeddings in database. 
- Step 5: Define a vector index
- Step 5: Perform vector Similarity search
  

### Database choices. 

#### Turso
1. Need to use drizzle/prisma to avoid writing SQL. 

Pro - 
Cons - 
1. Hard to do as compared to Convex. 

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
