import { z } from "zod";

export const CreateBoard = z.object({
    title: z.string({
        required_error: 'Title is required',
        invalid_type_error: 'Title is required'
    }).min(3, {
        message: 'Title should be over 4 ltters'
    }),
    image: z.string({
        required_error: 'Image is required',
        invalid_type_error: 'image is required'
    })
});