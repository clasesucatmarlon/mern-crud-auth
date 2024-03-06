import {z} from "zod"; 

export const createSchema = z.object({
    title: z.string({
        required_error: "Title is required"
    }).min(5, {
        required: "Password must be at least 5 characteres"
    }),
    description: z.string({
        required_error: "Description is required"
    }).min(5, {
        required: "Password must be at least 5 characteres"
    }),
    date: z.string().datetime().optional()
});