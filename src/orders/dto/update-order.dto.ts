export class UpdateOrderDto {
	invoice?: number
	name?: string
	surname?: string
	phoneNumber?: number
	email?: string
	comment?: string
	status?: 'Выполнен' | 'Комплектуется' | 'Отменен' | 'Не выполнен'
	summa?: number
	prepayment?: number
}
