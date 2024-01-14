import axios from 'axios';
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/admin/store"
const URL_MANAGER_STORES = "http://localhost:8080/admin/stores/"

class StoreService {

    getStores(){
        return axios.get(URL_MANAGER_STORES,{ headers: authHeader() });
    }


    createStore(storeName, revenue, authToken) {
        return axios.post(API_URL, {
            'name': storeName,
            'revenue': revenue,
        }, {headers: {
                'Authorization': authToken
            }
        });
    }

    getStoreById(storeId){
        return axios.get(API_URL + '/' + storeId);
    }

    getStorePurchases(storeId, purchases){
        return axios.get(API_URL + '/' + storeId + purchases);

    }
    getStoreOverloads(storeId, overloads){
        return axios.get(API_URL + '/' + storeId + overloads);

    }
    getStoreTransfers(storeId, transfers){
        return axios.get(API_URL + '/' + storeId + transfers);

    }

}
export default new StoreService()