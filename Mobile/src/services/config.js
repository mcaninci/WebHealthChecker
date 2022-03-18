
import { Platform } from "react-native";


const API_URL = process.env.NODE_ENV === 'production' ? "http://142.93.149.43:8080" 
:  Platform.OS === "ios" ?"http://142.93.149.43:8080":"http://142.93.149.43:8080"
 //"http://142.93.149.43:8080":"http://142.93.149.43:8080" //"http://localhost:5000";

export default {
    API_URL,
};