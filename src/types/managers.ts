import { z } from "zod"

export const managerListDto = z.array(
    z.object({
        id: z.number(),
        name: z.string(),
        short_name: z.string()
    })
);

export type ManagerList = z.infer<typeof managerListDto>