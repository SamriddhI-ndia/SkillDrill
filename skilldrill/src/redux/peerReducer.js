import { ADD_PEER, REMOVE_PEER } from "./peerActions";

export const peerReducer = (state, action)=>{
    switch (action){
        case ADD_PEER:
            return {
                ...state,
                [action.payload.peerId]:{
                    stream: action.payload.stream,
                },
            };
        case REMOVE_PEER:
            return{
                ...state //change krna hai abhi
            };
        default:
            return {...state};
    }
}