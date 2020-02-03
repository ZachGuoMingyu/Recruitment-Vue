/*
 * @Author: guomy 
 * @Date: 2019-12-25 09:36:49 
 * @Last Modified by: zachGmymy
 * @Last Modified time: 2020-02-03 10:52:17
 */
import axios from '@/utils/axios'
/* 查找数据 */

/**
 * 通过id删除城市信息
 * @param {object} param {id:''}
 */
export function deleteCityById(param){
  return axios.post('/City/deleteById',param);
}
/**
 *查找所有城市信息
 */
export function findAllCity(){
  return axios.get('/City/findAll');
}
/**
 * 通过id查找城市信息
 * @param {object} param {id:''}
 */
export function findCityById(param){
  return axios.get('/City/findById',{params:param});
}
/**
 * 根据省份ID查找城市信息
 * @param {object} param {provinceId:''}
 */
export function findCityByProvinceId(param){
  return axios.get('/City/findByProvinceId',{params:param});
}
/**
 * 更新修改城市信息
 * @param {object} param
 */
export function saveOrUpdateCity(param){
  return axios.post('/City/saveOrUpdate',param);
}