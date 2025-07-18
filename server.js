const express = require("express");
 require("dotenv").config()
const http = require("http"); 
const { Server } = require("socket.io");
const { dbConnection } = require("./db");
const { router } = require("./routes/Auth");
const cors = require("cors");
const { productRouter } = require("./routes/Product");
const { categoryRouter } = require("./routes/CateogryRoute");
const { userRoutersById } = require("./routes/User");
const { cartRoutes } = require("./routes/Cart");
const { notificationRouters } = require("./routes/NotificationRoutes");
const { popRouter } = require("./routes/PopupRouters");
const photosRouter = require("./routes/photoRouter");

const app = express();
const server = http.createServer(app); 
 const PORT=process.env.PORT
const io = new Server(server, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"],
  },
});


app.set("io", io);


dbConnection();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, exposedHeaders: ["X-Total-Count"] }));


app.use("/api", router);
app.use("/api", productRouter);
app.use("/api", categoryRouter);
app.use("/api", userRoutersById);
app.use("/api", cartRoutes);
app.use("/api", notificationRouters);
app.use("/api",popRouter)
app.use("/api",photosRouter)

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
