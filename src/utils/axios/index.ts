import { deepMerge, setObjToUrlParams } from '../index'
import { isString } from '../is'
import { getToken } from '../auth'
import { InitAxios } from './initAxios'
import { formatRequestDate } from './helper'
import { ContentTypeEnum, RequestEnum, ResultEnum } from '@/enums/httpEnum'
import { globalConfig } from '@/utils/env'

const { apiUrl, urlPrefix } = globalConfig()

// 数据处理
const transform = {
  // 处理请求数据
  transformRequestHook: (res, options) => {
    const { isTransformResponse, isReturnNativeResponse } = options
    // 是否返回原生响应头 比如：需要获取响应头时使用该属性
    if (isReturnNativeResponse)
      return res

    // 不进行任何处理，直接返回
    // 用于页面代码可能需要直接获取code，data，message这些信息时开启
    if (!isTransformResponse)
      return res.data

    // 错误的时候返回

    const { data } = res

    if (!data) {
      // return '[HTTP] Request has no return value';
      throw new Error('sys.api.apiRequestFailed')
    }
    //  这里 code，result，message为 后台统一的字段，需要在 types.ts内修改为项目自己的接口返回格式
    const { code, data: result, message } = data

    // 这里逻辑可以根据项目进行修改'
    const hasSuccess = data && Reflect.has(data, 'code') && code === ResultEnum.SUCCESS

    if (hasSuccess)
      return { code, result, message }
  },

  // 请求之前处理config
  beforeRequestHook: (config, options) => {
    const { apiUrl, joinPrefix, joinParamsToUrl, formatDate, urlPrefix } = options
    if (joinPrefix)
      config.url = `${urlPrefix}${config.url}`

    if (apiUrl && isString(apiUrl))
      config.url = `${apiUrl}${config.url}`

    const params = config.params || {}
    const data = config.data || false
    formatDate && data && !isString(data) && formatRequestDate(data)
    if (config.method?.toUpperCase() === RequestEnum.GET) {
      if (!isString(params)) {
        config.params = Object.assign(params || {})
      }
      else {
        // 兼容restful风格
        config.url = `${config.url}/${params}`
        config.params = undefined
      }
    }
    else {
      if (!isString(params)) {
        formatDate && formatRequestDate(params)
        if (Reflect.has(config, 'data') && config.data && Object.keys(config.data).length > 0) {
          config.data = data
          config.params = params
        }
        else {
          // 非GET请求如果没有提供data，则将params视为data
          config.data = params
          config.params = undefined
        }
        if (joinParamsToUrl) {
          config.url = setObjToUrlParams(
            config.url as string,
            Object.assign({}, config.params, config.data),
          )
        }
      }
      else {
        // 兼容restful风格
        config.url = `${config.url}/${params}`
        config.params = undefined
      }
    }
    return config
  },

  // 请求拦截器处理
  requestInterceptors: (config, options) => {
    // 请求之前处理config
    const token = getToken()

    if (token && config?.requestOptions?.withToken !== false) {
      // jwt token
      config.headers.Authorization = options.authenticationScheme
        ? `${options.authenticationScheme} ${token}`
        : token
    }

    // TODO 没有token的情况
    return config
  },

  // 请求拦截器错误处理
  requestInterceptorsCatch: (error) => {
    return error
  },

  // 响应拦截器处理
  responseInterceptors: (res) => {
    // TODO 处理无效token的情况
    return res
  },

  // 响应错误处理
  responseInterceptorsCatch: (error) => {
    // const { response, code, message, config } = error
    return Promise.reject(error)
  },
}

const createAxios = (opt?: any) => {
  return new InitAxios(deepMerge({
    // 身份验证
    authenticationScheme: 'Bearer',
    // 接口超时
    timeout: 10 * 1000,
    // 基础接口地址
    baseURL: '',
    // json格式头部
    headers: { 'Content-Type': ContentTypeEnum.JSON },
    // 数据处理方式
    transform,
    // 配置项
    requestOptions: {
      // 默认将prefix 添加到url
      joinPrefix: true,
      // 是否返回原生响应头 比如：需要获取响应头时使用该属性
      isReturnNativeResponse: false,
      // 需要对返回数据进行处理
      isTransformResponse: true,
      // post请求的时候添加参数到url
      joinParamsToUrl: false,
      // 格式化提交参数时间
      formatDate: true,
      // 消息提示类型
      errorMessageMode: 'message',
      // 接口地址
      apiUrl,
      // 接口拼接地址
      urlPrefix,
      //  是否加入时间戳
      joinTime: true,
      // 忽略重复请求
      ignoreCancelToken: true,
      // 是否携带token
      withToken: true,
    },
  }, opt))
}

export const defHttp = createAxios()

