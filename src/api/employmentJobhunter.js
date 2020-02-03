/*
 * @Author: guomy 
 * @Date: 2019-12-25 16:08:05 
 * @Last Modified by: zachGmymymy
 * @Last Modified time: 2020-02-03 10:54:05
 */


import axios from '@/utils/axios'

/* 查找数据 */
export async function findAllEmploymentJobhunter() {
    return await axios.get('/EmploymentJobhunter/findAll');
  }
  export async function findAllWithJobhAndEmpl() {
    return await axios.get('/EmploymentJobhunter/findAllWithJobhAndEmpl');
  }
