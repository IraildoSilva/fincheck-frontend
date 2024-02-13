import { Controller } from 'react-hook-form'
import { Button } from '../../../../components/Button'
import { ColorsDropdownInput } from '../../../../components/ColorsDropdownInput'
import { Input } from '../../../../components/Input'
import { InputCurrency } from '../../../../components/InputCurrency'
import { Modal } from '../../../../components/Modal'
import { Select } from '../../../../components/Select'
import { useNewAccountModalController } from './useNewAccountModalController'

export function NewAccountModal() {
	const {
		isNewAccountModalOpen,
		closeNewAccountModal,
		register,
		errors,
		handleSubmit,
		control,
		isLoading,
	} = useNewAccountModalController()

	return (
		<Modal
			title="Nova Conta"
			open={isNewAccountModalOpen}
			onClose={closeNewAccountModal}
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
