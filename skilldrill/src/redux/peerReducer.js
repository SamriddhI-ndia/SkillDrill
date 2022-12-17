import { DeleteRounded } from "@mui/icons-material";
import { ADD_PEER, REMOVE_PEER } from "./peerActions";

export const peerReducer = (state, action)=>{
    console.log("------------------------------------------------------");

    console.log({state});
    switch (action.type){
        case ADD_PEER:
            return {
                ...state,
                [action.payload.socketId]:{
                    stream: action.payload.stream,
                },
            };
        case REMOVE_PEER:
            const { [action.payload.socketId]:deleted, ...rest } = state;
            return rest;
        default:
            return {...state};
    }
}