import { Controller } from 'react-hook-form'
import { Button } from '../../../../components/Button'
import { ColorsDropdownInput } from '../../../../components/ColorsDropdownInput'
import { Input } from '../../../../components/Input'
import { InputCurrency } from '../../../../components/InputCurrency'
import { Modal } from '../../../../components/Modal'
import { Select } from '../../../../components/Select'
import { useEditAccountModalController } from './EditAccountModalController'
import { TrashIcon } from '../../../../components/icons/TrashIcon'
import { ConfirmDeleteModal } from '../../../../components/ConfirmDeleteModal'

export function EditAccountModal() {
	const {
		isEditAccountModalOpen,
		closeEditAccountModal,
		register,
		errors,
		handleSubmit,
		control,
		isLoading,
		isDeleteModalOpen,
		handleOpenDeleteModal,
		handleCloseDeleteModal,
		handleDeleteAccount,
		isLoadingDelete,
	} = useEditAccountModalController()

	if (isDeleteModalOpen) {
		return (
			<ConfirmDeleteModal
				isLoading={isLoadingDelete}
				onConfirm={handleDeleteAccount}
				onClose={handleCloseDeleteModal}
				title="Tem certeza que deseja excluir essa conta?"
				description="Ao excluir a conta, também serão excluídos todos os registros de receita e despesas relacionados."
			/>
		)
	}

	return (
		<Modal
			title="Editar Conta"
			open={isEditAccountModalOpen}
			onClose={closeEditAccountModal}
			rightAction={
				<button onClick={handleOpenDeleteModal}>
					<TrashIcon className="w-6 h-6 text-red-900" />
				</button>
			}
		>
			<form onSubmit={handleSubmit}>
				<div>
					<span className="text-gray-600 text-xs text-center">
						Saldo inicial
					</span>

					<div className="flex items-center gap-2">
						<span className="text-gray-600 tracking-[-0.5px] text-lg">R$</span>
						<Controller
							control={control}
							name="initialBalance"
							defaultValue={0}
							render={({ field: { onChange, value } }) => (
								<InputCurrency
									onChange={onChange}
									value={value}
									error={errors.initialBalance?.message}
								/>
							)}
						/>
					</div>
				</div>

				<div className="mt-10 flex flex-col gap-4">
					<Input
						{...register('name')}
						type="text"
						placeholder="Nome da conta"
						error={errors.name?.message}
					/>

					<Controller
						control={control}
						name="type"
						render={({ field: { onChange, value } }) => (
							<Select
								placeholder="Tipo"
								onChange={onChange}
								value={value}
								options={[
									{
										value: 'CHECKING',
										label: 'Conta Corrente',
									},
									{
										value: 'INVESTMENT',
										label: 'Investimentos',
									},
									{
										value: 'CASH',
										label: 'Dinheiro Físico',
									},
								]}
								error={errors.type?.message}
							/>
						)}
					/>

					<Controller
						control={control}
						name="color"
						render={({ field: { onChange, value } }) => (
							<ColorsDropdownInput
								onChange={onChange}
								value={value}
								error={errors.color?.message}
							/>
						)}
					/>
				</div>

				<Button isLoading={isLoading} className="w-full mt-6">
					Salvar
				</Button>
			</form>
		</Modal>
	)
}
