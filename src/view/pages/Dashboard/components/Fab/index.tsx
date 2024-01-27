import { PlusIcon } from "@radix-ui/react-icons";
import { DropdownMenu } from "../../../../components/DropdownMenu";
import { CategoryIcon } from "../../../../components/icons/categories/CategoryIcon";
import { BankAccountIcon } from "../../../../components/icons/BankAccountIcon";
import { useDashboard } from "../DashboardContext/useDashboard";

export function Fab() {
	const { openNewAccountModal } = useDashboard();

	return (
		<div className="fixed bottom-4 right-4">
			<DropdownMenu.Root>
				<DropdownMenu.Trigger asChild>
					<button className=" w-12 h-12 rounded-full bg-teal-900 flex items-center justify-center text-white">
						<PlusIcon className="w-6 h-6" />
					</button>
				</DropdownMenu.Trigger>

				<DropdownMenu.Content side="top">
					<DropdownMenu.Item className="gap-2">
						<CategoryIcon type="expense" />
						Nova Despesa
					</DropdownMenu.Item>

					<DropdownMenu.Item className="gap-2">
						<CategoryIcon type="income" />
						Nova Receita
					</DropdownMenu.Item>

					<DropdownMenu.Item onSelect={openNewAccountModal} className="gap-2">
						<BankAccountIcon />
						Nova Conta
					</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</div>
	);
}
