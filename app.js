import express from "express";
let app = express();
import GlobalErrorHandling from "./middlewares/errorhandling.middleware.js";
import { router } from "./routes/auth.routes.js";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
//import ExpressMongoSanitize from "express-mongo-sanitize";
//import YAML from "yamljs";
//import swaggerUi from "swagger-ui-express";
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
  message: "You send too much requests , try again later",
});

app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
//app.use(ExpressMongoSanitize);

app.use("/", router);

//const swaggerDocument = YAML.load("./docs.yml");

//app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(GlobalErrorHandling);
export default app;
export { app };
