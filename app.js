import express from "express";
import employeeRouter from "#employees";
const app = express();
export default app;

import employees from "#db/employees";

app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

app.use(express.json());

app.route("/").get((req, res) => {
  res.send("Hello employees!");
});

app.use("/employees", employeeRouter);

app.use((err, req, res, next) => {
  res.status(500).send("Sorry! something went wrong");
});
