import { SortType } from "./sort-type.enum";

export class EmployeeFilterDto {
  search: string;
  sort: SortType;
  sortCriteria: string;
}
