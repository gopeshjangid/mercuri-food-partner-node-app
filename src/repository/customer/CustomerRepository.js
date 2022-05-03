import { Customer } from "../../models/customer/CustomerModel";
import { CustomerAuth } from "../../models/customer/CustomerAuthModel";
import Sequelize from "sequelize"
import { customer } from "../../constants/ErrorConstant";
export class CustomerRepository {

    async findCustomerByEmail(emailId) {
        return await Customer.findOne({ where: { email: emailId } });
    }

    async findCustomerByPassword(password) {
        return await Customer.findOne({ where: { password: password } });
    }

    async findCustomerByIdAuth(customerId) {
        return await CustomerAuth.findOne({ where: { customer_id: customerId } });
    }

    async saveCustomerSession(authData) {
        return await CustomerAuth.create(authData);
    }

    async updateIsLoggedInByCustomerId(customerId) {
        return CustomerAuth.updateOne({ customerId, "isLoggedIn": true }, { $set: { isLoggedIn: false } });
    }

    async saveCustomer(customerObj) {
        return Customer.create(customerObj)
            .catch(Sequelize.UniqueConstraintError, () => {
                throw new Error(customer.uniqueEmail);
            }).catch((err) => {
                throw ({ message: err.message });
            });
    }

    async findCustomerById(customerId) {
        return await Customer.findOne({ where: { id: customerId } });
    }

    async update(id, customer) {
        return await Customer.update(customer, { where: { id } });
    }
}




