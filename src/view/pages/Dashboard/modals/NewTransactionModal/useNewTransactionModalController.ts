import { z } from 'zod'
import { useDashboard } from '../../components/DashboardContext/useDashboard'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useBankAccounts } from '../../../../../app/hooks/useBankAccounts'
import { useCategories } from '../../../../../app/hooks/useCategories'
import { useMemo } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { transactionsService } from '../../../../../app/services/transactionsService'
import { currencyStringToNumber } from '../../../../../app/utils/currencyStringToNumber'
import toast from 'react-hot-toast'

const schema = z.object({
	value: z.string().min(1, 'Informe o valor'),
	name: z.string().min(1, 'Informe o nome'),
	categoryId: z.string().min(1, 'Informe uma categoria'),
	bankAccountId: z.string().min(1, 'Informe uma conta'),
	date: z.date(),
})

type FormData = z.infer<typeof schema>

export function useNewTransactionModalController() {
	const {
		isNewTransactionModalOpen,
		newTransactionType,
		closeNewTransactionModal,
	} = useDashboard()

	const {
		register,
		handleSubmit: hookFormSubmit,
		formState: { errors },
		control,
		reset,
	} = useForm<FormData>({
		resolver: zodResolver(schema),
		defaultValues: {
			bankAccountId: '',
			categoryId: '',
			value: '0',
			date: new Date(),
		},
	})

	const queryClient = useQueryClient()
	const { accounts, isFetching } = useBankAccounts()
	const { categories: categoriesList, isFetching: isLoadingCategories } =
		useCategories()
	const { isLoading, mutateAsync } = useMutation({
		mutationFn: transactionsService.create,
	})

	const handleSubmit = hookFormSubmit(async (data) => {
		try {
			await mutateAsync({
				...data,
				value: currencyStringToNumber(data.value),
				date: data.date.toISOString(),
				type: newTransactionType!,
			})

			queryClient.invalidateQueries({
				queryKey: ['bankAccounts'],
			})
			toast.success(
				newTransactionType === 'EXPENSE'
					? 'Despesa cadastrada com sucesso!'
					: 'Receita cadastrada com sucesso!'
			)
			closeNewTransactionModal()
			reset()
		} catch {
			toast.error(
				newTransactionType === 'EXPENSE'
					? 'Erro ao cadastrar despesa!'
					: 'Erro ao cadastrar receita!'
			)
		}
	})

	const categories = useMemo(
		() =>
			categoriesList.filter((category) => category.type === newTransactionType),
		[categoriesList, newTransactionType]
	)

	return {
		newTransactionType,
		isNewTransactionModalOpen,
		closeNewTransactionModal,
		register,
		errors,
		control,
		handleSubmit,
		accounts,
		isFetching,
		categories,
		isLoadingCategories,
		isLoading,
	}
}
