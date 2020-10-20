import {CLEAR_ERROR, GET_ERRORS} from './Type';

export const returnErrors= (errors,msg,id=null)=>
{
    console.log("called Return erros")
    return {
        type:GET_ERRORS,
        payload: {errors,msg,id}
    }
}

export const clearErrors = () => {


    return {
        type:CLEAR_ERROR
    }
}