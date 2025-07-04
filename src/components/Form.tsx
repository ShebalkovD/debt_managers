import type { JSX } from "react"
import { useForm, useController, type UseControllerProps } from "react-hook-form"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useSearchParams } from "react-router";
import { encodeSearchParams } from "./utils/encodeSearchParams";
import { zodResolver } from '@hookform/resolvers/zod';
import {z} from "zod";
import Button from '@mui/material/Button';

const formDTO = z.object({
    manager_id: z.string(),
    field1: z.string().optional()
}).refine((data) => !data.manager_id || Number(data.manager_id), {
    path: ['field1'],
    message: "не число"
})

type FormValues = z.infer<typeof formDTO>

export const Form = (): JSX.Element => {
    const [, setSearchParams] = useSearchParams();

    const FormInput = (props: UseControllerProps<FormValues>): JSX.Element => {
        const {field, formState} = useController(props);
        const errors = !!Object.entries(formState.errors).length
        return (
            <Box>
                <TextField {...field} placeholder={props.name} helperText={formState.errors['field1']?.message} error={errors}/>
            </Box>
        )
    }

    const {handleSubmit, control} = useForm<FormValues>({
        defaultValues: {
            manager_id: ""
        },
        resolver: zodResolver(formDTO),
        mode: "onChange"
    })

    const setQueryParams = (managerId: {manager_id: string | null}): void => {
        const encodedSearchParams = encodeSearchParams(managerId)
        setSearchParams(encodedSearchParams)
    }

    const onSubmit = (data: FormValues) => {
        const params = {manager_id: data.manager_id || null}
        setQueryParams(params)
    }

    return (
        <Box sx={{maxWidth: "20rem", marginTop: "1rem", marginLeft: "5rem"}}>
            <form onSubmit={handleSubmit(onSubmit)} >
                <FormInput name={"manager_id"} control={control} />
                <Button variant="contained" type="submit">Отправить</Button>
            </form>         
        </Box>
        
    )
}