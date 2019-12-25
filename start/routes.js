"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.get("/", () => {
  return { greeting: "Hello world in JSON" };
});

//Customers
Route.group(() => {
  Route.get("customers/:id", "CustomerController.show");
  Route.patch("customers/:id", "CustomerController.update");
  Route.delete("customers/:id", "CustomerController.destroy");
}).middleware(["findCustomer"]);
Route.get("customers", "CustomerController.index");
Route.post("customers", "CustomerController.store");

//Projects
Route.group(() => {
  Route.get("projects/:id", "ProjectController.show");
  Route.patch("projects/:id", "ProjectController.update");
  Route.delete("projects/:id", "ProjectController.destroy");
}).middleware(["findProject"]);
Route.get("projects", "ProjectController.index");
Route.post("projects", "ProjectController.store").middleware([
  "checkExistingCustomer"
]);

//Tasks
Route.group(() => {
  Route.get("tasks/:id", "TaskController.show");
  Route.patch("tasks/:id", "TaskController.update");
  Route.delete("tasks/:id", "TaskController.destroy");
}).middleware(["findTask"]);
Route.get("tasks", "TaskController.index");
Route.post("tasks", "TaskController.store").middleware([
  "checkExistingProject"
]);
