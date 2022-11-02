import type { AxiosInstance } from 'axios'
import axios from 'axios'
import { cloneDeep } from 'lodash-es'
import { isFunction } from '../is'
import { RequestEnum } from '@/enums/httpEnum'

export class InitAxios {
  private axiosInstance: AxiosInstance
  private readonly options

  constructor(options: any) {
    this.options = options
    this.axiosInstance = axios.create(options)
    this.setupInterceptors()
  }

  private setupInterceptors() {
    const transform = this.getTransform()
    if (!transform)
      return
    const {
      requestInterceptors,
      requestInterceptorsCatch,
      responseInterceptors,
      responseInterceptorsCatch,
    } = transform

    // 请求拦截器配置处理
    this.axiosInstance.interceptors.request.use((config) => {
      if (requestInterceptors && isFunction(requestInterceptors))
        config = requestInterceptors(config, this.options)

      return config
    }, undefined)

    // 请求拦截器错误捕获
    requestInterceptorsCatch
    && isFunction(requestInterceptorsCatch)
    && this.axiosInstance.interceptors.request.use(undefined, requestInterceptorsCatch)

    // 处理响应结果拦截器
    this.axiosInstance.interceptors.response.use((res) => {
      if (responseInterceptors && isFunction(responseInterceptors))
        res = responseInterceptors(res)

      return res
    }, undefined)

    // 响应结果拦截器错误捕获
    responseInterceptorsCatch
      && isFunction(responseInterceptorsCatch)
      && this.axiosInstance.interceptors.response.use(undefined, responseInterceptorsCatch)
  }

  // 获取处理数据方式
  private getTransform() {
    const { transform } = this.options
    return transform
  }

  request(config: any, options?: any) {
    let conf = cloneDeep(config)
    const transform = this.getTransform()

    const { requestOptions } = this.options
    const opt = Object.assign({}, requestOptions, options)

    const { beforeRequestHook, requestCatchHook, transformRequestHook } = transform || {}
    if (beforeRequestHook && isFunction(beforeRequestHook))
      conf = beforeRequestHook(conf, opt)

    conf.requestOptions = opt

    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request(conf)
        .then((res) => {
          if (transformRequestHook && isFunction(transformRequestHook)) {
            try {
              const ret = transformRequestHook(res, opt)
              resolve(ret)
            }
            catch (err) {
              reject(err || new Error('request error!'))
            }
            return resolve(res)
          }
          resolve(res)
        })
        .catch((e) => {
          if (requestCatchHook && isFunction(requestCatchHook)) {
            reject(requestCatchHook(e, opt))
            return
          }
          if (axios.isAxiosError(e)) {
            // rewrite error message from axios in here
          }
          reject(e)
        })
    })
  }

  get(config: any, options?: any) {
    return this.request({ ...config, method: RequestEnum.GET }, options)
  }

  post(config, options?) {
    return this.request({ ...config, method: RequestEnum.POST }, options)
  }

  put(config: any, options?: any) {
    return this.request({ ...config, method: RequestEnum.PUT }, options)
  }

  delete(config: any, options?: any) {
    return this.request({ ...config, method: RequestEnum.DELETE }, options)
  }
}
