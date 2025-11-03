import { app } from "./app.js";
import dbconnect from "./config/db.config.js";
import {accessLogger} from './logger.js'
dbconnect();
app.listen(3225, () => {
  console.log("Server is running on port 3330");
  accessLogger.info("Server is running on port 3330");
});
