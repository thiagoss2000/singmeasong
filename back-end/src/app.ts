import cors from "cors";
import express from "express";
import "express-async-errors";
import { errorHandlerMiddleware } from "./middlewares/errorHandlerMiddleware.js";
import e2eReset from "./routers/e2eTestRouter.js";
import recommendationRouter from "./routers/recommendationRouter.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/recommendations", recommendationRouter);
app.use(e2eReset);
app.use(errorHandlerMiddleware);

export default app;
