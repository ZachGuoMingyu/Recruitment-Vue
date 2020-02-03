/*
 * @Author: guomy 
 * @Date: 2019-12-25 09:36:23 
 * @Last Modified by: guomy
 * @Last Modified time: 2019-12-25 09:50:41
 */
import axios from '@/utils/axios'
/* 查找数据 */
/**
 * 通过id删除省份信息
 * @param {object} param {id:''}
 */
export function deleteCityById(param){
  return axios.post('/Province/deleteById',param);
}
/**
 *查找所有省份信息
 */
export function findAllProvince(){
  return axios.get('/Province/findAll');
}
/**
 * 通过id查找省份信息
 * @param {object} param {id:''}
 */
export function findProvinceById(param){
  return axios.get('/Province/findById',{params:param});
}
/**
 * 更新修改省份信息
 * @param {object} param
 */
export function saveOrUpdateProvince(param){
  return axios.post('/Province/saveOrUpdate',param);
}