import { GET_CITY } from "../constants"

export function addCity(city) {
    return {
        type: GET_CITY,
        value: city
    }
}