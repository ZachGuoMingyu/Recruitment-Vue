/*
 * @Author: guomy 
 * 
 * @Date: 2019-12-25 09:03:32 
 * @Last Modified by: guomy
 * @Last Modified time: 2019-12-25 14:50:16
 */


import axios from '@/utils/axios'

/* 查找数据 */
export async function findAllJobhunter() {
    return await axios.get('/Jobhunter/findAll');
  }