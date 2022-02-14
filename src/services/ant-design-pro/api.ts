// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return request<{
    results: API.CurrentUser;
  }>('/api/AdminOperation/selectAdmin', {
    method: 'POST',
    ...(options || {}),
  });
}
/** 登录接口 POST /api/LoginAdmin/selectOneAdminUser */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/LoginAdmin/selectOneAdminUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取学生信息 */
export async function getStudent(body: API.StudentParams, options?: { [key: string]: any }) {
  return request<API.StudentResults>('/api/AdminOperation/selectStudentOperation ', {
    method: 'POST',
    data: body,
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}
//获取公司信息
export async function getCompany(body: API.CompanyParams, options?: { [key: string]: any }) {
  return request<API.CompanyResults>('/api/AdminOperation/selectComapnyOperation', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
/** 获取职位列表信息 */
export async function getJob(body: API.JobParams, options?: { [key: string]: any }) {
  return request<API.JobResults>('/api/AdminOperation/selectJobOperation', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
//职位详情
export async function jobDetail(body: API.JobDetailParams, options?: { [key: string]: any }) {
  return request<API.JobDetailResult>('/api/AdminOperation/selectJobInformation', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
//重置密码
export async function resetPassword(
  body: API.UpdateStudentParams,
  option?: { [key: string]: any },
) {
  return request('/api/AdminStudent/resetPassword', {
    method: 'POST',
    data: body,
    ...(option || {}),
  });
}
//获取公司信息列表
export async function selectCompany(body: API.CompanyParams, option?: { [key: string]: any }) {
  return request('/api/AdminCompany/selectCompany', {
    method: 'POST',
    data: body,
    ...(option || {}),
  });
}
// 新增公司账户
export async function newCompanyAccount(
  body: API.AddCompanyParams,
  option?: { [key: string]: any },
) {
  return request('/api/AdminCompany/insertCompanyAccount', {
    method: 'POST',
    data: body,
    ...(option || {}),
  });
}
//禁用公司账号
export async function forbidCompany(body: API.ActionParams, option?: { [key: string]: any }) {
  return request('/api/AdminCompany/updateCompanyAccountStatus', {
    method: 'POST',
    data: body,
    ...(option || {}),
  });
}
//重置密码
export async function updataCompPass(body: API.ActionParams, option?: { [key: string]: any }) {
  return request('/api/AdminCompany/resetPassword', {
    method: 'POST',
    data: body,
    ...(option || {}),
  });
}
// 查看公司所有职位
export async function selectJobList(body: API.CompanyJobParams, option?: { [key: string]: any }) {
  return request('/api/AdminCompany/selectPositionByCompanyId', {
    method: 'POST',
    data: body,
    ...(option || {}),
  });
}
//公司职位详情
export async function compJobDetail(body: API.JobDetailParams, option?: { [key: string]: any }) {
  return request('/api/AdminCompany//selectPositionInformation', {
    method: 'POST',
    data: body,
    ...(option || {}),
  });
}
// 禁用/启用职位
export async function forbidJob(body: API.JobDetailParams, option?: { [key: string]: any }) {
  return request('/api/AdminCompany/updateCompanyJobStatus', {
    method: 'POST',
    data: body,
    ...(option || {}),
  });
}
//获取管理员信息
export async function getAdminInfo() {
  return request<{
    results: API.AdminInfo;
  }>('/api/AdminInformation/selectInformation', {
    method: 'POST',
  });
}
//更新管理员信息
export async function updateAdmin(body: API.AdminParams, option?: { [key: string]: any }) {
  return request('/api/AdminInformation//updateAdminInformation', {
    method: 'POST',
    data: body,
    ...(option || {}),
  });
}
//验证旧密码
export async function validatorOldPass(body: API.PassWrodParams, option?: { [key: string]: any }) {
  return request('/api/AdminInformation/selectPassword', {
    method: 'POST',
    data: body,
    ...(option || {}),
  });
}
//修改密码
export async function updatePassword(body: API.PassWrodParams, option?: { [key: string]: any }) {
  return request('/api/AdminInformation/updatePassword', {
    method: 'POST',
    data: body,
    ...(option || {}),
  });
}
export async function selectStudent(body: API.StudentParams, options?: { [key: string]: any }) {
  return request('/api/AdminStudent/selectStudent', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}
export async function updataStudentStatus(
  body: API.UpdateStudentParams,
  option?: { [key: string]: any },
) {
  return request('/api//AdminStudent/updateStudentAccountStatus', {
    method: 'POST',
    data: body,
    ...(option || {}),
  });
}
export async function selectStudentInfo(
  body: API.UpdateStudentParams,
  option?: { [key: string]: any },
) {
  return request('/api/AdminStudent/selectStudentInformation', {
    method: 'POST',
    data: body,
    ...(option || {}),
  });
}

export async function selectName(body: API.SelectName, option?: { [key: string]: any }) {
  return request<API.SelectNameResult>('/api/selectname', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(option || {}),
  });
}
