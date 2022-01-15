import { ToastAndroid } from "react-native";
import { GET_DETAIL, REMOVE_DETAIL } from "../constants";

const initialState = {
    details: []
};

function checkId(city){
    return city.id == this
}
const detailReducer = (state = initialState, action) => { 
    switch (action.type) {
        case GET_DETAIL:
            if (state.details.findIndex(checkId, action.value.id) == -1) {
                return {
                    ...state,
                    details: [...state.details, action.value]
                };                
            }else {
                ToastAndroid.show(
                    "La ville a déjà été ajouté par defaut !",
                    ToastAndroid.SHORT
                );
            }

        case REMOVE_DETAIL:
            return {
                ...state,
                details: state.details.filter((details) => details.id != action.value)
            };
        default:
            return state;
    }
}
export default detailReducer;