import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
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