import express from "express";
const employeeRouter = express.Router();
export default employeeRouter;
import employees, {
  addEmpolyee,
  getEmployeeByID,
  getEmployees,
} from "#db/employees";

employeeRouter
  .route("/")
  .get((req, res) => {
    const employees = getEmployees();
    res.send(employees);
  })
  .post((req, res) => {
    if (!req.body) return res.status(400).send("Request must have body");
    const { name } = req.body;
    if (!name) return res.status(400).send("New employees must have name");
    const newEmployee = addEmpolyee(name);
    res.status(201).send(newEmployee);
  });

employeeRouter.route("/").get((req, res) => {
  res.send(employees);
});
// Note: this middleware has to come first! Otherwise, Express will treat
// "random" as the argument to the `id` parameter of /employees/:id.
employeeRouter.route("/random").get((req, res) => {
  const randomIndex = Math.floor(Math.random() * employees.length);
  res.send(employees[randomIndex]);
});

employeeRouter.route("/:id").get((req, res) => {
  const { id } = req.params;
  // req.params are always strings, so we need to convert `id` into a number
  // before we can use it to find the employee
  const employee = getEmployeeByID(+id);
  if (!employee) return res.status(404).send("Employee not found");
  res.send(employee);
});
