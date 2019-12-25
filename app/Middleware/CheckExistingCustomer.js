"use strict";

const Customer = use("App/Models/Customer");

class CheckExistingCustomer {
  async handle({ request, response }, next) {
    const { customer_id } = request.post();
    const customer = await Customer.find(customer_id);

    if (!customer) {
      return response.status(404).json({
        message: "Customer not exists.",
        customer_id
      });
    }

    // call next to advance the request
    await next();
  }
}

module.exports = CheckExistingCustomer;
