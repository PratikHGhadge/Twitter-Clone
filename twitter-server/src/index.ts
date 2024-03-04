import { initServer } from "./app";
import dotenv from "dotenv";

async function init() {
  const app = await initServer();
  app.listen(8000, () => console.log(`server started at PORT:8000 `));
}
dotenv.config();
init();
