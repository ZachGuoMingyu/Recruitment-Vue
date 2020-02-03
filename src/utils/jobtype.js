/*
 * @Author: guomy 
 * @Date: 2019-12-26 16:43:57 
 * @Last Modified by: guomy
 * @Last Modified time: 2019-12-28 16:00:37
 */
import axios from '@/utils/axios'
/**
 * 通过id删除职位信息
 * @param {Object} param {id:''} 
 */
export function deleteJobTypeById(param) {
    return axios.post('/JobType/deleteById', param);
  }
  /**
   * 查找所有职位信息
   */
  export function findAllJobTypes() {
    return axios.get('/JobType/findAll');
  }
  /**
   * 通过id查找职位信息
   * @param {Object} param {id:''}
   */
  export function findJobTypeById(param) {
    return axios.get('/JobType/findById', {
      params: param
    });
  }

  /**
   * 保存或更新职位信息
   * @param {Object} param
   */
  export function saveOrUpdateJobType(param) {
    return axios.post('/JobType/saveOrUpdate', param);
  }
  
