import { app } from "./app.ts";

import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

try {
  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => {
    console.log(`⚙️ Server is running at port : ${PORT}`);
  });
} catch (error) {
  console.error("❌ Error starting server:", error);
}
