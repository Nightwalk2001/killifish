import {get}                                 from "@/libs/persist"
import {API_URL}                             from "./constant"
import {Body, fetch, FetchOptions, Response} from "@tauri-apps/api/http"

type ApiResponse<T> = { data?: T, error?: any }
type OptionsWithoutMethod = Omit<FetchOptions, "method">

const defaultOptions = {
    headers: {
        "Content-Type": "application/json",
    },
}

const resHandler   = <T>(res: Response<T> | void): ApiResponse<T> => {
          if (res) return {data: res.data}
          else return {error: "empty body"}
      },
      errorhandler = (err: any): ApiResponse<void> => ({error: err})

const requester = <T = any>(url: string, options?: FetchOptions) => fetch<T>(API_URL + url, {
    headers: {authorization: get<Profile>("profile")},
    method: "GET",
    ...options,
})
    .then(resHandler)
    .catch(errorhandler)

export const getter = <T>(
    url: string,
    options?: FetchOptions,
) => requester<T>(url, options)

export const poster = <T, K>(
    url: string,
    data: K,
) => requester<T>(url, {method: "POST", body: Body.json(data)})

export const putter = <T>(
    url: string,
    options: OptionsWithoutMethod,
) => requester<T>(url, {method: "PUT", ...options})

export const deleter = <T>(
    url: string,
    options: OptionsWithoutMethod,
) => requester<T>(url, {method: "DELETE", ...options})
