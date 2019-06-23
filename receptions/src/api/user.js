import { fetch } from '../utils/axios';
import api from './api-config'

export const createUser = (data)=>fetch(api.api+'/user/create',{
    data,
    type:'post'
});
export const getInfo = (data)=>fetch(api.api+'/user/getinfo',{
  data,
  type:'post'
});

