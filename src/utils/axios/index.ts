import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import { deepMerge } from '../index'
import { InitAxios } from './initAxios'
import { ContentTypeEnum } from '@/enums/httpEnum'

// 数据处理
const transform = {
  // 处理请求数据
  transformRequestHook: () => {},

  // 请求之前处理config
  beforeRequestHook: () => {},

  // 请求拦截器处理
  requestInterceptors: () => {},

  // 请求拦截器错误处理
  requestInterceptorsCatch: () => {},

  // 响应拦截器处理
  responseInterceptors: () => {},

  // 响应错误处理
  responseInterceptorsCatch: () => {},
}

const createAxios = (opt?: any) => {
  return new InitAxios(deepMerge({
    // 身份验证
    authenticationScheme: '',
    // 接口超时
    timeout: 60 * 1000,
    // 基础接口地址
    baseURL: '',
    // json格式头部
    headers: { 'Content-Type': ContentTypeEnum.JSON },
    // 数据处理方式
    transform,
    // 配置项
    requestOptions: {

    },
  }, opt))
}

export const defHttp = createAxios()

