import "reflect-metadata";
import { createExpressServer,useContainer } from "routing-controllers";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { UserControllers } from "./controllers/UserControllers";
import { container } from "./containers/container";

dotenv.config();
useContainer(container);
const app = createExpressServer({
  controllers: [UserControllers],
  cors: {
    origin: "*",
    credentials: true,
  },
});

mongoose.connect(process.env.DB_CONNECTION_STRING).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(
      `DataBase connected and server is running on port ${process.env.PORT}`
    );
  });
});
