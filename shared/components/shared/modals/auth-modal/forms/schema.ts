import { z } from 'zod';

export const passwordSchema = z.string().min(6, { message: 'Please enter a valid password' });

export const fromLoginSchema = z.object({
    email: z.string().email({ message: 'Please enter a valid email' }),
    password: passwordSchema,
});

export const formRegisterSchema = fromLoginSchema
.merge(
    z.object({
        fullName: z.string().min(2, { message: 'Enter your name' }),
        confirmPassword: passwordSchema,
    }),
)
.refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
});

export type TFormLoginValues = z.infer<typeof fromLoginSchema>;
export type TFormRegisterValues = z.infer<typeof formRegisterSchema>;