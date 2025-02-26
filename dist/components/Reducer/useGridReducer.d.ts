import { GridState } from "./GridReducer";
import { SortDirection } from "../GridTypes";
export interface GridReducerReturn<T> {
    state: GridState<T>;
    setSort: (column: string, direction: SortDirection) => void;
    setFilter: (filters: Record<string, string>) => void;
    clearFilter: (column: string) => void;
    setGroup: (column: string) => void;
    removeGroup: (column: string) => void;
    toggleRow: (row: T) => void;
    setPage: (page: number) => void;
    setPageSize: (pageSize: number) => void;
    expandGroup: (column: string) => void;
    updateGridState: () => void;
}
/** 🔹 useGridReducer 훅 */
declare function useGridReducer<T>(data: T[], pagingable?: boolean, pageSize?: number): GridReducerReturn<T>;
export { useGridReducer };
