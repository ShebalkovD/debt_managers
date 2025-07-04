import * as z from 'zod'

export const debtsItemDTO = z.object({
  customer: z.string(),
  manager: z.string(),
  debt: z.number()
})

export const debtsListDTO = z.object({
  report_date: z.string().optional(),
  debts: z.array(debtsItemDTO).optional()
})

export type DebtsItem = z.infer<typeof debtsItemDTO>
export type DebtsList = z.infer<typeof debtsListDTO>


