import { FETCH_USER } from "../actions/types";


export default function (state = null, action) {
  switch (action.type){
    case FETCH_USER:
return action.payload || false  // this is user model. Payload is empty string and instead it we need to return false
    default:
      return state
  }
}





