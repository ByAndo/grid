import { useReducer } from "react";
import { gridReducer, GridState, initialGridState } from "./GridReducer";
import { SortDirection } from "../GridTypes";
import { gridStateChanges } from "../Utility/GridUtility";

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
    updateGridState : () => void;
    editCell : (rowKey: string, colKey: string, newValue: any) => void;
    setEditingCell : (rowKey: string, colKey: string, newValue: any) => void;
    clearEditingCell : () => void;
    applyAllChanges : () => void;
    resetAllChanges : () => void;
    removeEditedCell : (rowKey: string, colKey: string) => void;
    applyRowChanges : (rowKey: string) => void;
    resetRowChanges : (rowKey: string) => void;
    
}

/** 🔹 useGridReducer 훅 */
function useGridReducer<T>(data: T[], pagingable: boolean = false, pageSize : number = 10) : GridReducerReturn<T>  {
    const [state, dispatch] = useReducer(gridReducer<T>, initialGridState<T>(data, pagingable, pageSize));
    
    /** 🔹 컬럼 정렬 변경 */
    const setSort = (column: string, direction: SortDirection) => {        
        dispatch({ 
            type: "SET_GRID_STATE", 
            state: gridStateChanges({ 
                ...state, 
                sortedColumn: column, 
                sortDirection: direction 
            }) 
        });
    };

    /** 🔹 특정 컬럼에 필터 적용 */
    const setFilter = (filters: Record<string, string>) => {        
        const newFilters = { ...state.filters, ...filters };        
        dispatch({ 
            type: "SET_GRID_STATE", 
            state: gridStateChanges({ 
                ...state, 
                filters: newFilters 
            }) 
        });
    };

    /** 🔹 특정 컬럼의 필터 제거 */
    const clearFilter = (column: string) => {
        const newFilters = { ...state.filters };
        delete newFilters[column];        
        
        dispatch({ 
            type: "SET_GRID_STATE", 
            state: gridStateChanges({ 
                ...state, 
                filters: newFilters 
            }) 
        });
    };

    /** 🔹 컬럼을 그룹핑 */
    const setGroup = (column: string) => {        
        dispatch({ 
            type: "SET_GRID_STATE",
            state: gridStateChanges({ 
                ...state, 
                group: { 
                    ...state.group, 
                    column: [...state.group.column, column] 
                } 
            }) 
        });        
        
    };

    /** 🔹 컬럼 그룹핑 해제 */
    const removeGroup = (column: string) => {        
        dispatch({ 
            type: "SET_GRID_STATE", 
            state: gridStateChanges({ 
                ...state, 
                group: { 
                    ...state.group, 
                    column: state.group.column.filter(c => c !== column) 
                } 
            }) 
        });
    };

    /** 🔹 특정 Row 선택/해제 */
    const toggleRow = (row: T) => {
        dispatch({ type: "TOGGLE_ROW", row });
    };
    /** 🔹 Group Expend */
    const expandGroup = (column : string) => {
        const newExpanded = new Set(state.group.expanded);
        if (newExpanded.has(column)) {
            newExpanded.delete(column); // ✅ 이미 열려 있으면 닫기
        } else {
            newExpanded.add(column); // ✅ 닫혀 있으면 열기
        }                
        // ✅ 변경된 그룹 상태를 반영하여 데이터 갱신
        dispatch({
            type: "SET_GRID_STATE",
            state: gridStateChanges({ 
                ...state, 
                group: { 
                    ...state.group, 
                    expanded: newExpanded 
                } 
            })
        });        
    };

    /** 🔹 페이지 변경 */
    const setPage = (page: number) => {
        dispatch({ 
            type: "SET_GRID_STATE", 
            state: gridStateChanges({ 
                ...state, 
                pagenate: { 
                    ...state.pagenate, 
                    currentPage: page 
                } 
            }) 
        });
    };
    /** 🔹 페이지 크기 변경 */
    const setPageSize = (pageSize: number) => {
        dispatch({ 
            type: "SET_GRID_STATE",  
            state: gridStateChanges({ 
                ...state, 
                pagenate: { 
                    ...state.pagenate, 
                    pageSize: pageSize 
                } 
            }) 
        });
    }

    const setEditingCell = (rowKey: string, colKey: string, value: any) => {
        dispatch({ type: "SET_EDITING_CELL", payload: { rowKey, colKey, value } });
    };
    
    const clearEditingCell = () => {
        dispatch({ type: "CLEAR_EDITING_CELL" });
    };
    
    const editCell = (rowKey: string, colKey: string, newValue: any) => {
        dispatch({ type: "EDIT_CELL", payload: { rowKey, colKey, newValue } });
    };
    
    const removeEditedCell = (rowKey: string, colKey: string) => {
        dispatch({ type: "REMOVE_EDITED_CELL", payload: { rowKey, colKey } });
    };

    const applyRowChanges = (rowKey: string) => {
        dispatch({ type: "APPLY_ROW_CHANGES", payload: { rowKey } });
    };
    
    const resetRowChanges = (rowKey: string) => {
        dispatch({ type: "RESET_ROW_CHANGES", payload: { rowKey } });
    };
    
    const applyAllChanges = () => {
        dispatch({ type: "APPLY_ALL_CHANGES" });
    };
    
    const resetAllChanges = () => {
        dispatch({ type: "RESET_ALL_CHANGES" });
    };   


    /** 🔹 Grid 상태 전체 업데이트 */
    const updateGridState = () => {
        dispatch({ 
            type: "SET_GRID_STATE", 
            state: gridStateChanges(state) 
        });
    };   


    return {
        state,
        updateGridState,
        setSort,
        setFilter,
        clearFilter,
        setGroup,
        removeGroup,
        expandGroup,
        toggleRow,
        setPage,
        setPageSize,
        editCell,
        setEditingCell,
        clearEditingCell,
        applyAllChanges,
        resetAllChanges,
        removeEditedCell,
        applyRowChanges,
        resetRowChanges,
    };
}

export { useGridReducer };
