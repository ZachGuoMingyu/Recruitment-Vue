/*
 * @Author: guomy 
 客服模块接口
 * @Date: 2019-12-25 14:50:43 
 * @Last Modified by: zachGmymy
 * @Last Modified time: 2020-02-03 10:55:11
 */
import axios from '@/utils/axios';
/**
 * 通过id删除客服信息
 * @param {object} param {id:''}
 */
export function deleteCustomerServiceById(param){
    return axios.post('/CustomerService/deleteById',param);
  }
  /**
 * 查找所有客服信息
 */
export function findAllCustomerService() {
    return axios.get('/CustomerService/findAll');//有几个接口，写几个导出
  }
  /**
 * 通过状态查找客服
 * @param {object} param {id:''}
 */
export function findCustomerServiceByEducation(param) {
    return axios.get('/CustomerService/findByEducation',{params:param});
  }
  /**
 * 通过性别查找客服
 * @param {object} param {id:''}
 */
export function findCustomerServiceByGender(param) {
    return axios.get('/CustomerService/findByGender',{params:param});
  }
  /**
 * 通过id查找客服信息
 * @param {object} param {id:''}
 */
export function findCustomerServiceById(param) {
    return axios.get('/CustomerService/findById',{params:param});
  }
  /**
 * 通过用户名查找客服
 * @param {object} param {id:''}
 */
export function findCustomerServiceByUsername(param) {
    return axios.get('/CustomerService/findByUsername',{params:param});
  }
/**
 * 保存或删除客服信息
 * @param {object} param {id:''}
 */
export function saveOrUpdateCustomerService(param){
    return axios.post('/CustomerService/saveOrUpdate',param);
  }