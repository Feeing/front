import axios from 'axios';
import {LOGIN_USER, USER_SIGN_UP, REGISTER_GROUP, GET_INFO, GET_HISTORY, GET_NOTICE, GET_QNA, UPDATE_GROUP, UPDATE_TITLE, UPDATE_MEMO} from './type';
import { USER_SERVER } from '../config';

export const loginUser  = (dataToSubmit) => {
    const request = axios.post(`${USER_SERVER}/rest-auth/login/`, dataToSubmit)
    .then(response => response.data)
    .catch(error => {})
    return{
        type: LOGIN_USER,
        payload: request
    }
}

export const userSignUp = (dataToSubmit) => {
    const request = axios.post(`${USER_SERVER}/rest-auth/signup/`, dataToSubmit)
    .then(response => response.data)
    .catch(error => error.response)
    return{
        type: USER_SIGN_UP,
        payload: request
    }
}

export const registerGroup = (dataToSubmit) => {
    const token = "Token "+String(window.localStorage.getItem('accessToken'));
    const request = axios.post(`${USER_SERVER}/api/groups/create/`, dataToSubmit,{
        headers:{
            Authorization : token
        }
    })
    .then(response => response.data)
    .catch(error => error.response)
    return{
        type: REGISTER_GROUP,
        payload: request
    }
}

export const getInfo = (username) => {
    const token = "Token "+String(window.localStorage.getItem('accessToken'));
    const request = axios.get(`${USER_SERVER}/api/users/${username}`,{
        headers:{
            authorization: token
        }
    })
    .then(response => response.data)
    return{
        type: GET_INFO,
        payload: request
    }
}

export const getHistory = (group_id) => {       //6
    const token = "Token "+String(window.localStorage.getItem('accessToken'));
    const request = axios.get(`${USER_SERVER}/api/transaction/group/${group_id}`,{
        headers:{
            authorization: token
        }
    })
    .then(response => response.data)
    return{
        type: GET_HISTORY,
        payload: request
    }
}

export const getNotice = (group_id) => {        //8
    const token = "Token "+String(window.localStorage.getItem('accessToken'));
    const request = axios.get(`${USER_SERVER}/api/notice/list/group/${group_id}`,{
        headers:{
            authorization: token
        }
    })
    .then(response => response.data)
    return{
        type: GET_NOTICE,
        payload: request
    }
}

export const getQna = (group_id) => {           //10
    const token = "Token "+String(window.localStorage.getItem('accessToken'));
    const request = axios.get(`${USER_SERVER}/api/question/list/group/detail/${group_id}`,{
        headers:{
            authorization: token
        }
    })
    .then(response => response.data)
    return{
        type: GET_QNA,
        payload: request
    }
}

export const updateGroup = (group_id) => {
    const token = "Token "+String(window.localStorage.getItem('accessToken'));
    const request = axios.get(`${USER_SERVER}/api/transaction/renew/`)
    .then(response => response.data)
    return{
        type: UPDATE_GROUP,
        payload: request
    }
}

export const updateTitle = (id, value) => {
    const token = "Token "+String(window.localStorage.getItem('accessToken'));
    const request = axios.patch(`${USER_SERVER}/api/transaction/modify/title/${id}`, value,{
        headers:{
            Authorization : token
        }
    })
    .then(response => response.data)
    .catch(error => error.response)
    return{
        type: REGISTER_GROUP,
        payload: request
    }
}

export const updateMemo = (id, value) => {
    const token = "Token "+String(window.localStorage.getItem('accessToken'));
    const request = axios.patch(`${USER_SERVER}/api/transaction/modify/memo/${id}`, value,{
        headers:{
            Authorization : token
        }
    })
    .then(response => response.data)
    .catch(error => error.response)
    return{
        type: REGISTER_GROUP,
        payload: request
    }
}