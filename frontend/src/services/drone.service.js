import axios from 'axios';
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/manager/drone"
const URL_MANAGER_DRONES = "http://localhost:8080/manager/drones/"
const URL_PILOT_DRONE = "http://localhost:8080/pilot/fly/"

class DroneService {

    getDronesForStore(storeName){
        return axios.get(URL_MANAGER_DRONES.concat(storeName), { headers: authHeader() });
    }

    getDroneById(droneId){
        return axios.get(API_URL + '/' + droneId);
    }

    createDrone(store, name, capacity, fuel) {
        return axios.post(API_URL, {
            'store': store,
            'droneName': name,
            'capacity': capacity,
            'fuel': fuel
        }, { headers: authHeader() });
    }

    flyDroneByPilot(store, droneName, pilotAccount) {
        return axios.put(URL_PILOT_DRONE.concat(store)
            .concat("/").concat(droneName)
            .concat("/").concat(pilotAccount), null, {headers: authHeader()});
    }
}

export default new DroneService()