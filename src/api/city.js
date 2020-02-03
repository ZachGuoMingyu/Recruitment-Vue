/*
 * @Author: guomy 
 * 城市模块API
 * @Date: 2019-12-22 18:54:17 
 * @Last Modified by: guomy
 * @Last Modified time: 2019-12-22 19:53:09
 */
import axios from '@/utils/axios'
/* 查找数据 */
/**
 * 查找所有的城市
 */
export  function findAllCity() {
  return axios.get('/City/findAll');
}

/**
 * 查找所有的省份
 */
export function findAllProvince(){
  return axios.get('Province/findAll');
}
/**
 * 根据id删除城市
 */
export function deleteCityByid(id){
   return axios.post('City/deleteById',{id:id});
}
/**
 * 添加城市
 */
export function ToaddCity(city){
 return axios.post('/City/saveOrUpdate',city);
}
/**
 * 添加省份
 */
export function ToaddProvince(province){
  return axios.post('/Province/saveOrUpdate',province)
}
/**
 * 删除省份
 */
export function deleteProvince(id){
  return axios.post('/Province/deleteById',id)
}