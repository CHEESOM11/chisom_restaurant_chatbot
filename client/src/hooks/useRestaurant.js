import { useContext } from "react";
import { RestaurantContext } from "../context/RestaurantContext";

export function useRestaurant() {
    return useContext(RestaurantContext);
} 
