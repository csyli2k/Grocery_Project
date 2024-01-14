import axios from 'axios';
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/admin/adjustReturn"
const URL_MANAGER_PILOTS = "http://localhost:8080/admin/pilots/"
const URL_USER = "http://localhost:8080/user/"


class ReturnService {

    adjustReturn(returnDays, returnTimes){
        return axios.post(API_URL,{
            'numOfReturnDays':returnDays,
            'numOfMaxAllowOrders': returnTimes

        },{ headers: authHeader() });
    }

    requestItemReturn(returnID, itemName, qty){
        return axios.post(URL_USER.concat('returnItem')
            .concat('/').concat(returnID)
            .concat('/').concat(itemName)
            .concat('/').concat(qty),{
            'returnID':returnID,
            'itemName': itemName,
            'qty': qty
        },{ headers: authHeader() });
    }

    returnOrder(returnID){
        return axios.post(URL_USER.concat('returnOrder')
            .concat('/').concat(returnID),{
            'returnID':returnID,
        },{ headers: authHeader() });
    }




}
export default new ReturnService()