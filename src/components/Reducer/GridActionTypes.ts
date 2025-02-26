import { SortDirection } from "../GridTypes";
import { GridState } from "./GridReducer";

/** 🔹 컬럼 정렬 변경 액션 */
interface SetSortAction {
    type: "SET_SORT";
    column: string;
    direction: SortDirection;
}

/** 🔹 특정 컬럼에 필터 적용 액션 */
interface SetFilterAction {
    type: "SET_FILTER";
    filters : Record<string, string>  
}

/** 🔹 특정 컬럼의 필터 제거 액션 */
interface ClearFilterAction {
    type: "CLEAR_FILTER";
    column: string;
}

/** 🔹 컬럼을 그룹핑 액션 */
interface SetGroupAction {
    type: "SET_GROUP";
    column: string;
}

/** 🔹 컬럼 그룹핑 해제 액션 */
interface RemoveGroupAction {
    type: "REMOVE_GROUP";
    column: string;
}

/** 🔹 특정 Group Expand & Collapse Row 선택/해제 액션 */
interface ToggleGroupExpandAction {
    type: "TOGGLE_GROUP_EXPAND";
    column: string;
}

interface ToggleRowAction<T> {
    type: "TOGGLE_ROW";
    row: T;
}

/** 🔹 페이지 변경 액션 */
interface SetPageAction {
    type: "SET_PAGE";
    page: number;
}
/** 🔹 페이지 변경 액션 */
interface SetPageSizeAction {
    type: "SET_PAGE_SIZE";
    pageSize: number;
}

interface SetGridStateAction<T>{
    type: "SET_GRID_STATE";
    state: GridState<T>;
}
/** 🔹 Grid 액션 타입 정의 */
type GridAction<T> =
    | SetGridStateAction<T>
    | SetSortAction
    | SetFilterAction
    | ClearFilterAction
    | SetGroupAction
    | RemoveGroupAction
    | ToggleGroupExpandAction
    | ToggleRowAction<T>
    | SetPageAction
    | SetPageSizeAction

export type { 
    GridAction,
    SetGridStateAction,    
    SetSortAction, 
    SetFilterAction, 
    ClearFilterAction, 
    SetGroupAction, 
    RemoveGroupAction,
    ToggleGroupExpandAction,
    ToggleRowAction,
    SetPageAction,
    SetPageSizeAction
};