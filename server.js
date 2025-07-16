const express = require("express");
const http = require("http"); // ✅ create HTTP server
const { Server } = require("socket.io"); // ✅ socket.io
const { dbConnection } = require("./db");
const { router } = require("./routes/Auth");
const cors = require("cors");
const { productRouter } = require("./routes/Product");
const { categoryRouter } = require("./routes/CateogryRoute");
const { userRoutersById } = require("./routes/User");
const { cartRoutes } = require("./routes/Cart");
const { notificationRouters } = require("./routes/NotificationRoutes");
const { popRouter } = require("./routes/PopupRouters");

const app = express();
const server = http.createServer(app); // ✅ wrap express app with HTTP server
 require("dotenv").config()
 const PORT=process.env.PORT
const io = new Server(server, {
  cors: {
    origin: "*", // allow all origins or your frontend URL
    methods: ["GET", "POST"],
  },
});

// ✅ Store io in app locals to use in controllers
app.set("io", io);

// ✅ Connect to DB
dbConnection();

// ✅ Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, exposedHeaders: ["X-Total-Count"] }));

// ✅ Routes
app.use("/api", router);
app.use("/api", productRouter);
app.use("/api", categoryRouter);
app.use("/api", userRoutersById);
app.use("/api", cartRoutes);
app.use("/api", notificationRouters);
app.use("/api",popRouter)

// ✅ Socket.io logic
io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
  });
});

// ✅ Start server with socket support
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
