/*
 * @Author: guomy 
 * @Date: 2019-12-25 09:38:48 
 * @Last Modified by: guomy
 * @Last Modified time: 2019-12-25 11:29:38
 */

import axios from '@/utils/axios'

/**
 * 1.通过id删除用户信息
 * @param {object} param {id:''}
 */
export function deleteJobhunterById(param){
  return axios.post('/Jobhunter/deleteById',param);
}
/**
 *2.查找所有用户信息
 */
export function findAllJobhunter(){
  return axios.get('/Jobhunter/findAll');
}
/**
 * 3.通过学历查找用户信息
 * @param {object} param {id:''}
 */
export function findJobhunterByEducation(param){
  return axios.get('/Jobhunter/findByEducation',{params:param});
}
/**
 * 4.通过性别查找用户信息
 * @param {object} param {id:''}
 */
export function findJobhunterByGender(param){
  return axios.get('/Jobhunter/findByGender',{params:param});
}
/**
 * 5.通过id查找用户信息
 * @param {object} param {id:''}
 */
export function findJobhunterById(param){
  return axios.get('/Jobhunter/findById',{params:param});
}
/**
 * 6.通过电话查找用户信息
 * @param {object} param {telephone:''}
 */
export function findJobhunterByTelephone(param){
  return axios.get('/Jobhunter/findByTelephone',{params:param});
}
/**
 * 7.通过用户名查找用户信息
 * @param {object} param {username:''}
 */
export function findJobhunterByUsername(param){
  return axios.get('/Jobhunter/findByUsername',{params:param});
}
/**
 * 9.用户注册
 * @param {object} param
 */
export function JobhunterquickRegistration(param){
  return axios.post('/Jobhunter/quickRegistration',param);
}
/**
 * 9.更新修改用户信息
 * @param {object} param
 */
export function saveOrUpdateJobhunter(param){
  return axios.post('/Jobhunter/saveOrUpdate',param);
}
