import { GET_CITY } from "../constants";

const initialState = {
    citys: [
        { id: 2293538, name: "Abidjan", country: "CI" },
        { id: 2643743, name: "London", country: "GB" },
        { id: 3117735, name: "Madrid", country: "ES" },
        { id: 2988507, name: "Paris", country: "FR" },
        { id: 2279755, name: "Yamoussoukro", country: "CI" },
    ]
};
const cityReducer = (state = initialState, action) => { 
    switch (action.type) {
        case GET_CITY:
            return {
                ...state,
                citys: [...state.citys, action.value]
            };
        default:
            return state;
    }
}
export default cityReducer;