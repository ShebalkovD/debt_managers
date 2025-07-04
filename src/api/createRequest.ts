import type { AxiosRequestConfig } from "axios"
import { axiosApi } from "./axiosApi"
import { z } from "zod"

type Props<Data, Schema extends z.ZodTypeAny> = {
  options: AxiosRequestConfig<Data>,
  schema?: Schema
}

export function createRequest<Data, Schema extends z.ZodTypeAny>({
  options,
  schema
}: Props<Data, Schema>): Promise<Data>{
  const response = axiosApi({...options})
    .then((res) => {
      if (schema) {
          const schemaResult = schema.safeParse(res.data);
          const isInvalid = !schemaResult.success

          if (isInvalid) {
            // eslint-disable-next-line no-console
            console.log('От сервера получены данные некорректного типа!');
            // eslint-disable-next-line no-console
            console.log('Некорректные типы -->', schemaResult.error?.issues);
            // eslint-disable-next-line no-console
            console.log('Данные -->', res.data);
            throw new Error('Сервер вернул неверный формат данных.');
          }
        }
      return res.data
    })
    .catch((err) => {throw new Error(err.message)})

  return response
}