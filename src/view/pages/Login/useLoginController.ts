import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { authService } from '../../../app/services/authService'
import { SigninParams } from '../../../app/services/authService/signin'
import { useAuth } from '../../../app/hooks/useAuth'
import { useEffect } from 'react'

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

  const { signin } = useAuth()

  const queryClient = useQueryClient()

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      const { accessToken } = await mutateAsync(data)

      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] })
      signin(accessToken)
    } catch {
      toast.error('Credenciais inválidas')
    }
  })

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Enter') {
        handleSubmit()
      }
    }

    document.addEventListener('keypress', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  })

  return {
    handleSubmit,
    register,
    errors,
    isLoading,
  }
}
