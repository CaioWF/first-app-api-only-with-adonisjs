"use strict";
const Customer = use("App/Models/Customer");

class FindCustomer {
  async handle({ request, response, params: { id } }, next) {
    const customer = await Customer.find(id);

    if (!customer) {
      return response.status(404).json({
        message: "Customer not found.",
        id
      });
    }

    request.customer = customer;

    // call next to advance the request
    await next();
  }
}

module.exports = FindCustomer;
