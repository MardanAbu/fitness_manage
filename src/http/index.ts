import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosRequestHeaders } from "axios";
import { ElMessage } from 'element-plus';

//axios configuration
const config = {
    //requested address by interface
    baseURL:process.env.BASE_API,
    timeout:10000,
    withCredentials: true //解决session不一致的问题
}

//return type
export interface Result<T = any> {
    code: number,
    msg: string,
    data: T
}
//axios encapsulation
class Http {
    //axios instance
    private instance: AxiosInstance;
    //constructor
    constructor(config:AxiosRequestConfig){
        //create axios instance
        this.instance = axios.create(config)
        //config intercenptor
        this.interceptors()
    }

    private interceptors(){
        //before sending request
        this.instance.interceptors.request.use((config:AxiosRequestConfig)=>{
            //add taken in the header of request
            let token= '';
            if(token){
                //set it to header
                config.headers!['token'] = token
            }
            return config;
        },(error:any)=>{
            error.data = {}
            error.data.msg = 'server error, connect administrator!'
            return error;
        }),
        this.instance.interceptors.response.use((res:AxiosResponse)=>{
            if(res.data.code != 200) {
                ElMessage.error(res.data.msg || 'server error!')
                return Promise.reject(res.data.msg || 'server error!')
            } else {
                return res.data
            }
        },(error:any)=>{
            console.log('Enter error')
            error.data = {};
            if (error && error.response) {
                switch (error.response.status) {
                    case 400:
                        error.data.msg = 'wrong request';
                        ElMessage.error(error.data.msg)
                        break
                    case 401:
                        error.data.msg = 'not authorized, please login';
                        ElMessage.error(error.data.msg)
                        break
                    case 403:
                        error.data.msg = 'access deny';
                        ElMessage.error(error.data.msg)
                        break
                    case 404:
                        error.data.msg = 'Not found error';
                        ElMessage.error(error.data.msg)
                        break
                    case 405:
                        error.data.msg = 'Method Not Allowed';
                        ElMessage.error(error.data.msg)
                        break
                    case 408:
                        error.data.msg = 'Request Timeout';
                        ElMessage.error(error.data.msg)
                        break
                    case 500:
                        error.data.msg = 'Internal Server Error';
                        ElMessage.error(error.data.msg)
                        break
                    case 501:
                        error.data.msg = 'Not Implemented';
                        ElMessage.error(error.data.msg)
                        break
                    case 502:
                        error.data.msg = 'Bad Gateway';
                        ElMessage.error(error.data.msg)
                        break
                    case 503:
                        error.data.msg = 'Service Unavailable';
                        ElMessage.error(error.data.msg)
                        break
                    case 504:
                        error.data.msg = 'Gateway Timeout';
                        ElMessage.error(error.data.msg)
                        break
                    case 505:
                        error.data.msg = 'HTTP Version Not Supported';
                        ElMessage.error(error.data.msg)
                        break
                    default:
                        error.data.msg = `Connection Error${error.response.status}`;
                        ElMessage.error(error.data.msg)
                }
            } else {
                error.data.msg = "Server Error";
                ElMessage.error(error.data.msg)
            }
            return Promise.reject(error)
        })
    }
    //Get request
    get<T = Result>(url:string,params?: object): Promise<T> {
        return this.instance.get(url, { params })
    }
    //POST request
    post<T = Result>(url:string,data?:object) : Promise<T>{
        return this.instance.post(url, data)
    }
    //PUT request
    put<T = Result>(url: string, data?: object): Promise<T> {
        return this.instance.put(url, data);
      }
    //DELETE request
    delete<T = Result>(url:string) : Promise<T>{
        return this.instance.delete(url)
    }

    //Image upload
    upload<T = Result>(url: string, params?: object): Promise<T> {
        return this.instance.post(url, params, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
}

//export tool
export default new Http(config)