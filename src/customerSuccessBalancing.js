/**
 * @param {array} customerSuccess
 * @param {array} customers
 * @param {array} customerSuccessAway
 */

function getResults(customerService) {
  const customerServicesMoreClients = customerService[0];
  const secoundCustomerServicesMoreClient = customerService[1];

  if (Object.is(customerServicesMoreClients.customerAvailableForClient, secoundCustomerServicesMoreClient.customerAvailableForClient)) {
    return 0;
  }

  return customerServicesMoreClients.id;
} 

 module.exports = function customerSuccessBalancing(
  customerSuccess,
  customers,
  customerSuccessAway
) {
  let uniqueCustomer = new Set(customers);

  const getCustomerAvailable = customerSuccess.filter(item => !customerSuccessAway.includes(item.id));
  const sortCustomers = getCustomerAvailable.sort((a, b) => a.score - b.score);

  const customerService = sortCustomers.map(customerSuccess => {
    let customerAvailableForClient = 0;

    uniqueCustomer.forEach((customer) => {
      if (customer.score <= customerSuccess.score) {
        uniqueCustomer.delete(customer);
        customerAvailableForClient++;
      }
    });

    return {
      ...customerSuccess,
      customerAvailableForClient,
    };
  }).sort((a, b) => b.customerAvailableForClient - a.customerAvailableForClient);

  return getResults(customerService);;
}

