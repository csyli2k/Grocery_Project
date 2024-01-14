import axios from 'axios';
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/admin/customer"
const URL_MANAGER_CUSTOMERS = "http://localhost:8080/admin/customers/"

class CustomerService {

    getCustomers(){
        return axios.get(URL_MANAGER_CUSTOMERS,{ headers: authHeader() });
    }


    createCustomer(account, firstName, lastName, phone, credit, rating) {
        return axios.post(API_URL, {
            'account': account,
            'firstName': firstName,
            'lastName': lastName,
            'phone': phone,
            'credit': credit,
            'rating':rating
        }, { headers: authHeader() });
    }

}
export default new CustomerService()