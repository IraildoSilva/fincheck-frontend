import { Controller } from 'react-hook-form'
import { Button } from '../../../../components/Button'
import { DatePickerInput } from '../../../../components/DatePickerInput'
import { Input } from '../../../../components/Input'
import { InputCurrency } from '../../../../components/InputCurrency'
import { Modal } from '../../../../components/Modal'
import { Select } from '../../../../components/Select'
import { useEditTransactionModalController } from './useEditTransactionModalController'
import { Transaction } from '../../../../../app/entities/Transaction'

interface EditTransactionModalProps {
  transaction: Transaction | null
  open: boolean
  onClose: () => void
}

export function EditTransactionModal({
  transaction,
  open,
  onClose,
}: EditTransactionModalProps) {
  const {
    register,
    errors,
    control,
    handleSubmit,
    accounts,
    isFetching,
    categories,
    isLoadingCategories,
    isLoading,
  } = useEditTransactionModalController(transaction, onClose)

  const isExpense = transaction?.type === 'EXPENSE'

  return (
    <Modal
      title={isExpense ? 'Editar Despesa' : 'Editar Receita'}
      open={open}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit}>
        <div>
          <span className="text-gray-600 text-xs text-center">
            Valor da {isExpense ? 'despesa' : 'receita'}
          </span>

          <div className="flex items-center gap-2">
            <span className="text-gray-600 tracking-[-0.5px] text-lg">R$</span>
            <Controller
              control={control}
              name="value"
              render={({ field: { onChange, value } }) => (
                <InputCurrency
                  onChange={onChange}
                  value={value}
                  error={errors.value?.message}
                />
              )}
            />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4">
          <Input
            {...register('name')}
            type="text"
            placeholder={isExpense ? 'Nome da Despesa' : 'Nome da Receita'}
            error={errors.name?.message}
          />

          <Controller
            control={control}
            name="categoryId"
            render={({ field: { onChange, value } }) => (
              <Select
                onChange={onChange}
                value={value}
                error={errors.categoryId?.message}
                isLoading={isLoadingCategories}
                disabled={isLoadingCategories}
                placeholder="Categoria"
                options={categories.map((category) => ({
                  value: category.id,
                  label: category.name,
                }))}
              />
            )}
          />

          <Controller
            control={control}
            name="bankAccountId"
            render={({ field: { onChange, value } }) => (
              <Select
                onChange={onChange}
                value={value}
                error={errors.bankAccountId?.message}
                placeholder={isExpense ? 'Pagar com' : 'Receber na conta'}
                isLoading={isFetching}
                disabled={isFetching}
                options={accounts.map((account) => ({
                  value: account.id,
                  label: account.name,
                }))}
              />
            )}
          />

          <Controller
            control={control}
            name="date"
            render={({ field: { onChange, value } }) => (
              <DatePickerInput
                error={errors.date?.message}
                value={value}
                onChange={onChange}
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
