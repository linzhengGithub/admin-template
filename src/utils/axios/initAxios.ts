import axios from 'axios'
import { cloneDeep } from 'lodash-es'
import { RequestEnum } from '@/enums/httpEnum'

export class InitAxios {
  private axiosInstance
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

    // 请求拦截器错误捕获

    // 处理响应结果拦截器

    // 响应结果拦截器错误捕获
  }

  // 获取处理数据方式
  private getTransform() {
    const { transform } = this.options
    return transform
  }

  request(config: any, options?: any) {
    const conf = cloneDeep(config)
    const transform = this.getTransform()

    const { requestOptions } = this.options
    const opt = Object.assign({}, requestOptions, options)

    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request(conf)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  get(config: any, options?: any) {
    this.request({ ...config, method: RequestEnum.GET }, options)
  }

  post(config: any, options?: any) {
    this.request({ ...config, method: RequestEnum.POST }, options)
  }

  put(config: any, options?: any) {
    this.request({ ...config, method: RequestEnum.PUT }, options)
  }

  delete(config: any, options?: any) {
    this.request({ ...config, method: RequestEnum.DELETE }, options)
  }
}
