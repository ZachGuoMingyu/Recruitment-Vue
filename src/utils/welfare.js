/*
 * @Author: guomy 
 * @Date: 2019-12-26 10:02:19 
 * @Last Modified by: guomy
 * @Last Modified time: 2019-12-26 15:38:48
 */

import axios from '@/utils/axios'
/**
 * 通过id删除福利信息
 * @param {Object} param {id:''} 
 */
export function deleteWelfareById(param) {
    return axios.post('/Welfare/deleteById', param);
  }
  /**
 * 查找所有福利信息
 */
export function findAllWelfare() {
    return axios.get('Welfare/findAll');
  }
  /**
 * 通过id查找福利信息
 * @param {Object} param {id:''}
 */
export function findWelfareById(param) {
    return axios.get('/Welfare/findById', {
      params: param
    });
  }
  /**
 * 保存或更新福利信息
 * @param {Object} param
 */
export function saveOrUpdateWelfare(param) {
    return axios.post('/Welfare/saveOrUpdate', param);
  }
  