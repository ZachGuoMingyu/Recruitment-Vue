import axios from '@/utils/axios'

// 查询所有的招聘信息
export function FindAllemployments(){
    return axios.get('/Employment/findAll');
}
// 通过城市名字查找招聘信息
export function FindEmploymentsByCity(city){
    return axios.get('/Employment/findByCity',{
        params:city}
        )
}
// 通过主键id查询招聘信息
export function FindEmploymentsById(id){
    return axios.get('Employment/findById',{params:id})
}
// 根据职位查找招聘信息
export function FindEmploymentsByJob(job){
    return axios.get('/Employment/findByJob',{params:job})
}
// 新增或者修改招聘
export function saveOrUpdateEmployments(employment){
    return axios.post('/Employment/saveOrUpdate',employment)
}