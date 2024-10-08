import { FilterIcon } from '../../../../components/icons/FilterIcon'
import { Swiper, SwiperSlide } from 'swiper/react'
import { MONTHS } from '../../../../../app/config/constants'
import { SliderOption } from './SliderOption'
import { SliderNavigation } from './SliderNavigation'
import { formatCurrency } from '../../../../../app/utils/formatCurrency'
import { CategoryIcon } from '../../../../components/icons/categories/CategoryIcon'
import { useTransactionsController } from './useTransactionsController'
import { cn } from '../../../../../app/utils/cn'
import { Spinner } from '../../../../components/Spinner'
import emptyState from '../../../../../assets/empty-state.svg'
import { TransactionTypeDropdown } from './TransactionTypeDropdown'
import { FiltersModal } from './FiltersModal'
import { formatDate } from '../../../../../app/utils/formatDate'
import { EditTransactionModal } from '../../modals/EditTransactionModal'
import { SummaryModal } from './SummaryModal'
import { SummaryButton } from './SummaryButton'

export function Transactions() {
  const {
    slideState,
    setSlideState,
    areValuesVisible,
    isInitialLoading,
    transactions,
    isLoading,
    isFiltersModalOpen,
    handleCloseFiltersModal,
    handleOpenFiltersModal,
    handleChangeFilters,
    filters,
    handleApplyFilters,
    handleOpenEditModal,
    handleCloseEditModal,
    isEditModalOpen,
    transactionBeingEdited,
    handleOpenSummaryModal,
    handleCloseSummaryModal,
    isSummaryModalOpen,
  } = useTransactionsController()

  const hasTransactions = transactions.length > 0

  return (
    <div className="rounded-2xl bg-gray-100 h-full w-full px-4 py-8 lg:p-10 flex flex-col">
      {isInitialLoading && (
        <div className="w-full h-full flex items-center justify-center">
          <Spinner className="w-10 h-10" />
        </div>
      )}

      {!isInitialLoading && (
        <>
          <FiltersModal
            onApplyFilters={handleApplyFilters}
            open={isFiltersModalOpen}
            onClose={handleCloseFiltersModal}
          />

          {hasTransactions && (
            <SummaryModal
              open={isSummaryModalOpen}
              onClose={handleCloseSummaryModal}
              transactions={transactions}
            />
          )}

          <header>
            <div className="flex justify-between items-center">
              <TransactionTypeDropdown
                onSelect={handleChangeFilters('type')}
                selectedType={filters.type}
              />

              <div className="flex gap-6">
                <SummaryButton onClick={handleOpenSummaryModal} />

                <button onClick={handleOpenFiltersModal}>
                  <FilterIcon />
                </button>
              </div>
            </div>

            <div className="mt-6 relative">
              <Swiper
                slidesPerView={3}
                spaceBetween={16}
                centeredSlides
                initialSlide={filters.month}
                onSlideChange={({ isBeginning, isEnd, realIndex }) => {
                  setSlideState({
                    isBeginning,
                    isEnd,
                  })

                  handleChangeFilters('month')(realIndex)
                }}
              >
                <SliderNavigation
                  isBeginning={slideState.isBeginning}
                  isEnd={slideState.isEnd}
                />

                {MONTHS.map((month, index) => (
                  <SwiperSlide key={month}>
                    {({ isActive }) => (
                      <SliderOption
                        isActive={isActive}
                        month={month}
                        index={index}
                      />
                    )}
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </header>

          <main className="mt-4 space-y-2 flex-1 md:overflow-y-auto px-1">
            {isLoading && (
              <div className="flex flex-col h-full items-center justify-center">
                <Spinner className="w-10 h-10" />
              </div>
            )}

            {!hasTransactions && !isLoading && (
              <div className="flex flex-col h-full items-center justify-center">
                <img src={emptyState} alt="Empty State" />

                <p className="text-gray-700">
                  Não encontramos nenhuma transação!
                </p>
              </div>
            )}

            {hasTransactions && !isLoading && (
              <>
                {transactionBeingEdited && (
                  <EditTransactionModal
                    open={isEditModalOpen}
                    onClose={handleCloseEditModal}
                    transaction={transactionBeingEdited}
                  />
                )}
                {transactions.map((transaction) => (
                  <div
                    role="button"
                    onClick={() => handleOpenEditModal(transaction)}
                    key={transaction.id}
                    className="bg-white p-4 rounded-2xl flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <CategoryIcon
                        type={
                          transaction.type === 'INCOME' ? 'income' : 'expense'
                        }
                        category={transaction.category?.icon}
                      />

                      <div>
                        <strong className="block font-bold tracking-[-0.5px] leading-none">
                          {transaction.name}
                        </strong>
                        <div className="flex flex-col text-gray-600">
                          <span className="text-sm leading-1">
                            {transaction.category?.name}
                          </span>
                          <span className="text-xs leading-none">
                            {formatDate(new Date(transaction.date))}
                          </span>
                        </div>
                      </div>
                    </div>

                    <span
                      className={cn(
                        'text-red-800 font-medium tracking-[-0.5px]',
                        !areValuesVisible && 'blur-sm',
                        transaction.type === 'INCOME' && 'text-green-800'
                      )}
                    >
                      {transaction.type === 'INCOME' ? '+ ' : '- '}
                      {formatCurrency(transaction.value)}
                    </span>
                  </div>
                ))}
              </>
            )}
          </main>
        </>
      )}
    </div>
  )
}
