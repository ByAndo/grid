import { GroupRow, SortDirection } from "../GridTypes";
import { GridState } from "../Reducer/GridReducer";
declare const isGroupRowHelper: <T>(row: T | GroupRow<T>) => row is GroupRow<T>;
declare const sortData: <T>(data: T[], key: keyof T, direction: SortDirection) => T[];
declare const groupData: <T>(data: T[], groupKeys: string[], expandedKeys?: Set<string>, depth?: number) => (T | GroupRow<T>)[];
declare const filterData: <T>(data: T[], filters: Record<string, string>) => T[];
declare const paginateData: <T>(data: T[], currentPage: number, pageSize: number, state?: GridState<T>) => T[];
declare const gridStateChanges: <T>(state: GridState<T>) => GridState<T>;
export { isGroupRowHelper, sortData, groupData, filterData, gridStateChanges, paginateData };
