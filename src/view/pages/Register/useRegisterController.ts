import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { authService } from '../../../app/services/authService'
import { useMutation } from '@tanstack/react-query'
import { SignupParams } from '../../../app/services/authService/signup'
import toast from 'react-hot-toast'
import { useAuth } from '../../../app/hooks/useAuth'

const schema = z.object({
	name: z.string().min(1, 'Nome é obrigatório'),
	email: z
		.string()
		.min(1, 'Email é obrigatório')
		.email('Insira um email válido'),
	password: z.string().min(8, 'A senha deve conter pelo menos 8 dígitos'),
})

type FormData = z.infer<typeof schema>

export function useRegisterController() {
	const {
		register,
		handleSubmit: hookFormHandleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		resolver: zodResolver(schema),
	})

	const { isLoading, mutateAsync } = useMutation({
		mutationFn: async (data: SignupParams) => {
			return authService.signup(data)
		},
	})

	const { signin } = useAuth()

	const handleSubmit = hookFormHandleSubmit(async (data) => {
		try {
			const { accessToken } = await mutateAsync(data)

			signin(accessToken)
		} catch (error) {
			toast.error('Ocorreu um erro ao criar sua conta')
		}
	})

	return {
		register,
		handleSubmit,
		errors,
		isLoading,
	}
}
