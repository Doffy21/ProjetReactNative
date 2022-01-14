import { GET_DETAIL, REMOVE_DETAIL } from "../constants"

export function addDetail(detail) {
    return {
        type: GET_DETAIL,
        value: detail
    }
}

export function removeDetail(detailIndex) {
    return {
        type: REMOVE_DETAIL,
        value: detailIndex
    }
}