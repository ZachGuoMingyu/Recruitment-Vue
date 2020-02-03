/*
 * @Author: guomy 
 * @Date: 2019-12-26 16:43:57 
 * @Last Modified by: zachGmymy
 * @Last Modified time: 2020-02-03 10:54:34
 */
import axios from '@/utils/axios'
/**
 * 通过id删除职位信息
 * @param {Object} param {id:''} 
 */
export function deleteJobsById(param) {
    return axios.post('/Jobs/deleteById', param);
  }
  /**
   * 查找所有职位信息
   */
  export function findAllJobs() {
    return axios.get('/Jobs/findAll');
  }
  /**
   * 通过id查找职位信息
   * @param {Object} param {id:''}
   */
  export function findJobsById(param) {
    return axios.get('/Jobs/findById', {
      params: param
    });
  }
  /**
   * 通过省份status查找职位
   * @param {Object} param {provinceId:''}
   */
  export function findJobsByStatus(param) {
    return axios.get('/Jobs/findByStatus', {
      params: param
    });
  }
  /**
   * 保存或更新职位信息
   * @param {Object} param
   */
  export function saveOrUpdateJobs(param) {
    return axios.post('/Jobs/saveOrUpdate', param);
  }
  
