import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:4000/api",
});

export function getSessionId() {
    let sessionId = 
    sessionStorage.getItem("sessionId");

    if (!sessionId) {
        sessionId = crypto.randomUUID();
        sessionStorage.setItem("sessionId", sessionId);
    }
    return sessionId;
}

export const getOrderHistory = (sessionId) => {
    return API.get(`/orders/history/${sessionId}`);
};
export default API;