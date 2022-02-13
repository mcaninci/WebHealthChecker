
import { Platform } from "react-native";


const API_URL = process.env.NODE_ENV === 'production' ? "https://ogloszenia-anglia.herokuapp.com/api/v1" :  Platform.OS === "ios" ?"http://localhost:5000":"https://192.168.1.255:5001" //"http://localhost:5000";

export default {
    API_URL,
};