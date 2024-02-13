import { z } from 'zod'
import { useDashboard } from '../../components/DashboardContext/useDashboard'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { bankAccountsService } from '../../../../../app/services/bankAccountsService'
import { currencyStringToNumber } from '../../../../../app/utils/currencyStringToNumber'
import toast from 'react-hot-toast'

const schema = z.object({
	initialBalance: z
		.string({ required_error: 'Saldo inicial é obrigatório' })
		.min(1, 'Saldo inicial é obrigatório'),
	name: z.string().min(1, 'Nome é obrigatório'),
	type: z.enum(['CHECKING', 'INVESTMENT', 'CASH'], {
		description: 'Tipo é obrigatório',
	}),
	color: z.string().min(1, 'Cor é obrigatória'),
})

type FormData = z.infer<typeof schema>

export function useNewAccountModalController() {
	const { isNewAccountModalOpen, closeNewAccountModal } = useDashboard()

	const {
		register,
		handleSubmit: hookFormSubmit,
		formState: { errors },
		control,
		reset,
	} = useForm<FormData>({
		resolver: zodResolver(schema),
		defaultValues: {
			color: '',
			name: '',
			initialBalance: '0',
			type: 'CHECKING',
		},
	})

	const { isLoading, mutateAsync } = useMutation(bankAccountsService.create)

	const handleSubmit = hookFormSubmit(async (data) => {
		try {
			await mutateAsync({
				...data,
				initialBalance: currencyStringToNumber(data.initialBalance),
			})

			toast.success('Conta cadastrada com sucesso!')
			closeNewAccountModal()
			reset()
		} catch {
			toast.error('Erro ao cadastrar a conta!')
		}
	})

	return {
		register,
		errors,
		handleSubmit,
		control,
		isLoading,
		isNewAccountModalOpen,
		closeNewAccountModal,
	}
}
