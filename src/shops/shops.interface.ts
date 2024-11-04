import { CountryDocument } from '../countries/countries.model'
import { CategoryDocument } from '../categories/categories.model'

export interface IShopFilters {
	countries?: Pick<CountryDocument, '_id'>[]
	categories?: Pick<CategoryDocument, '_id'>[]
}
