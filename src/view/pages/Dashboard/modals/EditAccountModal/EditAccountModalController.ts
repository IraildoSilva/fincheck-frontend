import { z } from 'zod'
import { useDashboard } from '../../components/DashboardContext/useDashboard'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { bankAccountsService } from '../../../../../app/services/bankAccountsService'
import { currencyStringToNumber } from '../../../../../app/utils/currencyStringToNumber'
import toast from 'react-hot-toast'

const schema = z.object({
	initialBalance: z.union([
		z.string().min(1, 'Saldo inicial é obrigatório'),
		z.number().min(1, 'Saldo inicial é obrigatório'),
	]),
	name: z.string().min(1, 'Nome é obrigatório'),
	type: z.enum(['CHECKING', 'INVESTMENT', 'CASH'], {
		description: 'Tipo é obrigatório',
	}),
	color: z.string().min(1, 'Cor é obrigatória'),
})

type FormData = z.infer<typeof schema>

export function useEditAccountModalController() {
	const { isEditAccountModalOpen, closeEditAccountModal, accountBeingEdited } =
		useDashboard()

	const {
		register,
		handleSubmit: hookFormSubmit,
		formState: { errors },
		control,
	} = useForm<FormData>({
		resolver: zodResolver(schema),
		defaultValues: {
			color: accountBeingEdited?.color,
			name: accountBeingEdited?.name,
			initialBalance: accountBeingEdited?.currentBalance,
			type: accountBeingEdited?.type,
		},
	})

	const queryClient = useQueryClient()

	const { isLoading, mutateAsync } = useMutation(bankAccountsService.update)

	const handleSubmit = hookFormSubmit(async (data) => {
		try {
			await mutateAsync({
				...data,
				initialBalance: currencyStringToNumber(data.initialBalance),
				id: accountBeingEdited!.id,
			})

			queryClient.invalidateQueries({ queryKey: ['bankAccounts'] })
			toast.success('A Conta foi editada com sucesso!')
			closeEditAccountModal()
		} catch {
			toast.error('Erro ao salvar as alterações!')
		}
	})

	return {
		register,
		errors,
		handleSubmit,
		control,
		isLoading,
		isEditAccountModalOpen,
		closeEditAccountModal,
		accountBeingEdited,
	}
}
