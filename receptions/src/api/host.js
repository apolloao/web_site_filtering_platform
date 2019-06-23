import api from './api-config'
import { fetch } from '../utils/axios'
export const hostList = (data)=>fetch(api.api+'/hs/list',{
    params:data,
    type:'get'
});
export const hostSave = (data)=>fetch(api.api+'/hs/save',{
    data,
    type:'post'
});
export const hostDelete = (data)=>fetch(api.api+'/hs/delete',{
    data,
    type:'post'

});
