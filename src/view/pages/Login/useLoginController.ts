import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { authService } from '../../../app/services/authService'
import { SigninParams } from '../../../app/services/authService/signin'

const schema = z.object({
  email: z
    .string()
    .min(1, 'Insira um email para entrar')
    .email('Informe um email válido'),
  password: z.string().min(8, 'A senha deve conter pelo menos 8 dígitos'),
})

type FormData = z.infer<typeof schema>

export function useLoginController() {
  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const { isLoading, mutateAsync } = useMutation({
    mutationFn: async (data: SigninParams) => {
      return authService.signin(data)
    },
  })

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      const { accessToken } = await mutateAsync(data)

      toast.success(accessToken)
    } catch (error) {
      console.log(error)
      toast.error('Credenciais inválidas')
    }
  })

  return {
    handleSubmit,
    register,
    errors,
    isLoading,
  }
}
