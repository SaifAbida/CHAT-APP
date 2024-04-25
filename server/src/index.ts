import "reflect-metadata";
import { createExpressServer, useContainer } from "routing-controllers";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { UserControllers } from "./controllers/UserControllers";
import { ConversationControllers } from "./controllers/ConversationControllers";
import { container } from "./containers/container";
import { Server } from "socket.io";

dotenv.config();
useContainer(container);
const app = createExpressServer({
  controllers: [UserControllers, ConversationControllers],
  cors: {
    origin: "*",
    credentials: true,
  },
});

const oi = new Server(app);

oi.on("connection", (_) => {
  console.log("user connected");
});

mongoose.connect(process.env.DB_CONNECTION_STRING).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(
      `DataBase connected and server is running on port ${process.env.PORT}`
    );
  });
});
