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
/** 🔹Cell 값 변경 */
interface SetEditCellAction {
    type: "EDIT_CELL";
    payload: {
        rowKey: string;
        colKey: string;
        newValue: any;
    };
}
interface SetEditingCellAction {
    type: "SET_EDITING_CELL";
    payload: {
        rowKey: string;
        colKey: string;
        value: any;
    };
}

interface ClearEditingCellAction {
    type: "CLEAR_EDITING_CELL";
}

interface RemoveEditedCellAction {
    type: "REMOVE_EDITED_CELL";
    payload: {
        rowKey: string;
        colKey: string;
    };
}
/** 🔹 특정 행의 변경 사항 적용 */
interface ApplyRowChangesAction {
    type: "APPLY_ROW_CHANGES";
    payload: {
        rowKey: string;
    };
}

/** 🔹 특정 행의 변경 사항 되돌리기 */
interface ResetRowChangesAction {
    type: "RESET_ROW_CHANGES";
    payload: {
        rowKey: string;
    };
}

/** 🔹모든 수정 값 변경 */
interface ApplyAllChangesAction {
    type: "APPLY_ALL_CHANGES";
}
/** 🔹모든 수정 값 되돌리기 */
interface ResetAllChangesAction {
    type: "RESET_ALL_CHANGES";
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
    | SetEditingCellAction
    | ClearEditingCellAction
    | SetEditCellAction
    | RemoveEditedCellAction
    | ApplyAllChangesAction
    | ResetAllChangesAction
    | ApplyRowChangesAction
    | ResetRowChangesAction

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
    SetPageSizeAction,
    SetEditingCellAction,
    ClearEditingCellAction,
    SetEditCellAction,
    RemoveEditedCellAction,
    ApplyAllChangesAction,
    ResetAllChangesAction,
    ApplyRowChangesAction,
    ResetRowChangesAction,
};