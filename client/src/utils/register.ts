import { RegisterType } from '@/types/types'
import { ZodType, z } from 'zod'

export const RegisterSchema:ZodType<RegisterType> = z.object({
    email: z.string()
        .email({ message: "올바른 이메일 형식이 아닙니다." })
        .trim().toLowerCase(),
    password: z
        .string()
        .min(6, { message: "비밀번호는 6글자 이상 20글자 이하로 입력해주세요." })
        .max(10, { message: "비밀번호는 6글자 이상 20글자 이하로 입력해주세요." })
        .regex(/^(?=.*[!@#$%^&*(),.?":{}|<>]).*$/, { message: "특수문자를 최소 1개 이상 포함해주세요." }),
    confirmPassword: z
        .string()
        .min(6, { message: "비밀번호는 6글자 이상 20글자 이하로 입력해주세요." })
        .max(10, { message: "비밀번호는 6글자 이상 20글자 이하로 입력해주세요." })
        .regex(/^(?=.*[!@#$%^&*(),.?":{}|<>]).*$/, { message: "특수문자를 최소 1개 이상 포함해주세요." }),
})

.refine((data) => data.password === data.confirmPassword, {
  message: "비밀번호가 일치하지 않습니다.",
  path: ["confirmPassword"]
})