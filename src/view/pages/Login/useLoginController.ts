import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

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

  const handleSubmit = hookFormHandleSubmit((data) => {
    console.log('Chama a api com:', data)
  })

  return {
    handleSubmit,
    register,
    errors,
  }
}