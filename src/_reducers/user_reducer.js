import{LOGIN_USER,REGISTER_USER, AUTH_USER, LOGOUT_USER,REGISTER_SUMMARY} from '../_actions/type'


export default function (state={},action){
    switch (action.type){
        case LOGIN_USER:
                return {...state,loginSuccess:action.payload};
            break;
        /*case REGISTER_USER:
                return {...state,register:action.payload};
            break;
        case REGISTER_SUMMARY:
            return{...state,register:action.payload}
            break;
            case AUTH_USER:
                return {...state,userData:action.payload};
            break; 
            case LOGOUT_USER:
                return { }  */

        default:
            return state;

        
    }
}