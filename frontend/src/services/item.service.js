import axios from 'axios';
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/manager/item"
const URL_MANAGER_ITEMS = "http://localhost:8080/manager/items/"

class ItemService {

    getItemsForStore(store){
        return axios.get(URL_MANAGER_ITEMS.concat(store), { headers: authHeader() });
    }

    getItemById(itemId){
        return axios.get(API_URL + '/' + itemId);
    }

    createItem(storeName, itemName, itemWeight) {
        return axios.post(API_URL, {
            'storeName': storeName,
            'name': itemName,
            'weight': itemWeight
        }, {headers: authHeader()});
    }
}
export default new ItemService()