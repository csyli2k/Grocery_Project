import axios from 'axios';
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/admin/pilot"
const URL_MANAGER_PILOTS = "http://localhost:8080/admin/pilots/"


class PilotService {

    getPilots(){
        return axios.get(URL_MANAGER_PILOTS,{ headers: authHeader() });
    }


    createPilot(account, firstName, lastName, license, phoneNumber, taxID, experience) {
        return axios.post(API_URL, {
            'account': account,
            'firstName': firstName,
            'lastName': lastName,
            'license': license,
            'phoneNumber': phoneNumber,
            'taxID': taxID,
            'experience':experience

        }, { headers: authHeader() });
    }


}
export default new PilotService()