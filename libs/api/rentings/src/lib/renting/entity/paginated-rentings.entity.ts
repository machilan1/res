// eslint-disable-next-line @nx/enforce-module-boundaries
import { Pagination } from 'libs/api/shared/helpers/pagination';
import { Renting } from './rentings.entity';

export class PaginatedRentings implements Pagination<Renting> {
  data!: Renting[];
  meta!: { limit: number; page: number; total: number };
}
