/*
 * @Author: guomy 
 * 省份模块API
 * @Date: 2019-12-22 18:54:17 
 * @Last Modified by: zachGmy
 * @Last Modified time: 2020-02-03 10:53:26
 */
import axios from '@/utils/axios'
//新增或修改招聘信息
export function saveOrUpdateEmployment(param) {
    return axios.post('/Employment/saveOrUpdate', param);
  }
//根据id删除招聘信息
export function deleteEmploymentById(param) {
    return axios.post('/Employment/deleteById', param);
  }
// 查询所有招聘信息
  export function findAllEmployment() {
    return axios.get('/Employment/findAll');
  }
//   根据城市找招聘信息 
export function findEmploymentByCity(param) {
    return axios.get('/Employment/findByCity', {
      params: param
    });
  }
// 根据职位找招聘信息
export function findEmploymentByJob(param) {
    return axios.get('/Employment/findByJob', {
      params: param
    });
  }
  //根据招聘标题查找招聘信息(模糊查询)
  export function findEmploymentByTitle(param) {
    return axios.get('/Employment/findByTitle', {
      params: param
    });
  }
//   根据福利查找招聘信息(模糊查询
export function findEmploymentByWelfare(param) {
    return axios.get('/Employment/findByWelfare', {
      params: param
    });
  }