import { FETCH_USER } from "../actions/types";

const authReducer = (state = null, action) => {
  switch (action.type){
    case FETCH_USER:
return action.payload || false  // this is user model. Payload is empty string and instead it we need to return false
    default:
      return state
  }
}

export  default authReducer



