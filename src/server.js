import express from "express";
// import cors from "cors";
import { ENVIRONMENT } from "./common/config/environment.js";
import { connectDB } from "./common/config/database.js";

// Default app configurations
const app = express();
const port = ENVIRONMENT.APP.PORT;
const appName = ENVIRONMENT.APP.NAME;

app.listen(port, async () => {
  console.log("==> " + appName + " listening on port " + port + "!");
  await connectDB();
});
