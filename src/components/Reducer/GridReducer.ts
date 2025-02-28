import { GridGroupState, GridPaginationProps, SortDirection} from "../GridTypes";
import { groupData, paginateData, sortData } from "../Utility/GridUtility";
import { GridAction } from "./GridActionTypes";


/** 🔹 Grid 상태 타입 정의 */
interface GridState<T> {
    /** 원본 Data */
    originalData: T[];
    /** 반영 Data */
    data: T[];
    /** 정렬된 컬럼 */
    sortedColumn: string | null; 
    /** 정렬 방향 */
    sortDirection: SortDirection; 
    /** 컬럼별 필터 상태 */
    filters: Record<string, string>; 
    /** 그룹핑된 컬럼 목록 */
    group: GridGroupState;
    /** 선택된 Row 목록 */
    selectedRows: Set<T>;
    /** 페이지 활성화 */    
    pagingable? : boolean; 
    /** 현재 페이지 */
    pagenate: GridPaginationProps; 
    /** 수정된 Data 관리 */
    editedRows : Record<string, Partial<T>>;
    /** 현재 편집 중인 셀 */
    editingCell: { rowKey: string; colKey: string; value: any } | null;
    
}

/** 🔹 초기 상태 값 */
const initialGridState = <T>(data: T[], pagingable: boolean, pageSize: number): GridState<T> => {

    return {
        originalData: [...data],
        data: pagingable ? paginateData(data, 1, pageSize) as T[] : data as T[], // ✅ 페이징 시 빈 Set 사용
        sortedColumn: null,
        sortDirection: null,
        filters: {},
        group: {
            column: [],
            expanded: new Set<string>, // ✅ 초기 확장 상태 저장
        },
        selectedRows: new Set<T>(),
        pagenate: {
            pageSize: pageSize,
            currentPage: 1,
        },
        editedRows : {},
        editingCell : null
    };
};



/** 🔹 Grid 리듀서 함수 */
function gridReducer<T>(state: GridState<T>, action: GridAction<T>): GridState<T> {
    switch (action.type) {
        /** 🔹 컬럼 정렬 변경 */
        case "SET_SORT":
            // 현재 정렬 상태 확인            
            {        
                return {
                    ...state,
                    sortedColumn: action.column,
                    sortDirection: action.direction,
                    data: action.direction === null 
                    ? [...state.originalData] // ✅ 정렬 해제 시 원본 데이터로 복구
                    :sortData(state.originalData, action.column as keyof T, action.direction), // ✅ 정렬된 데이터 반영
                };
            }

        /** 🔹 특정 컬럼에 필터 적용 */
        case "SET_FILTER": {
            const newFilters = { 
                ...state.filters,   // 기존 필터 유지
                ...action.filters   // 새로운 필터 추가 or 업데이트
            }
            
            return {
                ...state,
                filters: newFilters
            };
        }

        /** 🔹 특정 컬럼의 필터 제거 */
        case "CLEAR_FILTER": {
            return {
                ...state,
                filters: Object.fromEntries(
                    Object.entries(state.filters).filter(([key]) => key !== action.column)
                ),
            };
        }
        

        /** 🔹 컬럼을 그룹핑 */
        case "SET_GROUP": {
            const newGroupedColumns = [...state.group.column, action.column];
        
            return {
                ...state,
                group: {
                    ...state.group,
                    column: newGroupedColumns, // ✅ 새로운 그룹 컬럼 추가
                    expanded: new Set(state.group.expanded), // ✅ 기존 확장 상태 유지
                },
                data : groupData(state.originalData, newGroupedColumns) as T[]
            };
        }        
        
        /** 🔹 컬럼 그룹핑 해제 */
        case "REMOVE_GROUP": {
            const newGroupedColumns = state.group.column.filter((col) => col !== action.column);
            const newExpanded = new Set(state.group.expanded);

            // ✅ 해당 그룹이 해제되면 펼쳐진 상태에서도 제거
            newExpanded.delete(action.column);

            return {
                ...state,
                group: {
                    column: newGroupedColumns, // ✅ 그룹 컬럼에서 제거
                    expanded: newExpanded, // ✅ 확장 목록에서도 제거
                },
                data: newGroupedColumns.length > 0 
                    ? groupData(state.originalData, newGroupedColumns, newExpanded) as T[]// ✅ 남은 그룹이 있으면 다시 그룹핑
                    : [...state.originalData], // ✅ 모든 그룹이 해제되면 원본 데이터 복원
            };
        }

        
        case "TOGGLE_ROW" : {
            return {...state}
        }

        /** 🔹 특정 Row 선택/해제 */
        case "TOGGLE_GROUP_EXPAND": {
            const newExpanded = new Set(state.group.expanded);
            
            if (newExpanded.has(action.column)) {
                newExpanded.delete(action.column); // ✅ 이미 열려 있으면 닫기
            } else {
                newExpanded.add(action.column); // ✅ 닫혀 있으면 열기
            }
        
            return {
                ...state,
                group: {
                    ...state.group, // ✅ 기존 그룹 상태 유지
                    expanded: newExpanded, // ✅ 업데이트된 그룹 상태 저장
                }
            };
        }
        /** 🔹 페이지 변경 */
        case "SET_PAGE": {
            return {
                ...state,
                pagenate: {
                    ...state.pagenate,
                    currentPage: action.page, // ✅ pagenate 내부 currentPage 수정
                },
            };
        }
        /** 🔹 페이지 변경 */
        case "SET_PAGE_SIZE": {
            return {
                ...state,
                pagenate: {
                    ...state.pagenate,
                    pageSize: action.pageSize, // ✅ pagenate 내부 currentPage 수정
                },
            };
        }        
        case "SET_EDITING_CELL": {
            return {
                ...state,
                editingCell: {
                    rowKey: action.payload.rowKey,
                    colKey: action.payload.colKey,
                    value: action.payload.value
                }
            };
        }
        case "CLEAR_EDITING_CELL": {
            return {
                ...state,
                editingCell: null
            };
        }
        case "EDIT_CELL": {
            const { rowKey, colKey, newValue } = action.payload;
            return {
                ...state,
                editedRows: {
                    ...state.editedRows,
                    [rowKey]: {
                        ...state.editedRows[rowKey],
                        [colKey]: newValue
                    }
                }
            };
        }
        case "REMOVE_EDITED_CELL": {
            const { rowKey, colKey } = action.payload;
            const updatedRow = { ...state.editedRows[rowKey] };
            delete updatedRow[colKey as keyof T];

            if (Object.keys(updatedRow).length === 0) {
                const newEditedRows = { ...state.editedRows };
                delete newEditedRows[rowKey];
                return {
                    ...state,
                    editedRows: newEditedRows
                };
            }

            return {
                ...state,
                editedRows: {
                    ...state.editedRows,
                    [rowKey]: updatedRow
                }
            };
        }
        case "APPLY_ROW_CHANGES": {
            const { rowKey } = action.payload;
            
            // ✅ 해당 rowKey에 대한 변경 사항 가져오기
            const updatedRow = state.editedRows[rowKey];
        
            // ✅ 변경 사항이 없다면 그대로 반환
            if (!updatedRow) return state;
        
            const newData = state.data.map((row) =>
                (row as T & { rowKey: string }).rowKey === rowKey
                    ? { ...row, ...updatedRow } // ✅ 수정된 데이터 반영
                    : row
            );
        
            const newOriginalData = state.originalData.map((row) =>
                (row as T & { rowKey: string }).rowKey === rowKey
                    ? { ...row, ...updatedRow } // ✅ 원본 데이터도 함께 변경
                    : row
            );
        
            // ✅ editedRows에서 해당 rowKey 제거
            const newEditedRows = { ...state.editedRows };
            delete newEditedRows[rowKey];
        
            return {
                ...state,
                data: newData,
                originalData: newOriginalData, // ✅ 원본 데이터 업데이트
                editedRows: newEditedRows, // ✅ 해당 Row만 제거
                editingCell: null, // ✅ 편집 상태 초기화
            };
        }
        
        
        
        case "RESET_ROW_CHANGES": {
            const { rowKey } = action.payload;
        
            // ✅ 원본 데이터에서 해당 rowKey의 데이터 가져오기
            const originalRow = state.originalData.find(
                (row) => (row as T & { rowKey: string }).rowKey === rowKey
            );
        
            // ✅ 원본 데이터가 없으면 변경하지 않음
            if (!originalRow) return state;
        
            const newData = state.data.map((row) =>
                (row as T & { rowKey: string }).rowKey === rowKey
                    ? originalRow // ✅ 원본 데이터로 복원
                    : row
            );
        
            // ✅ editedRows에서 해당 rowKey 제거
            const newEditedRows = { ...state.editedRows };
            delete newEditedRows[rowKey];
        
            return {
                ...state,                
                data: newData, // ✅ 변경된 데이터 복원
                editedRows: newEditedRows, // ✅ 해당 Row의 변경 사항 삭제
                editingCell: null, // ✅ 편집 상태 초기화
            };
        }  
  
        case "APPLY_ALL_CHANGES": {
            const newData = state.originalData.map((row) =>
                state.editedRows[(row as T & {rowKey : string}).rowKey]
                    ? { ...row, ...state.editedRows[(row as T & {rowKey : string}).rowKey] }
                    : row
            )
            return {
                ...state,
                originalData : newData,  
                data : paginateData(newData, state.pagenate.currentPage, state.pagenate.pageSize, state),                              
                editedRows: {}, // ✅ 적용 후 초기화
                editingCell : null
            };
        }
        
        case "RESET_ALL_CHANGES": {
            return {
                ...state,
                editedRows: {}, // ✅ 모든 변경 사항 초기화
                editingCell : null,
            };
        }         
        /** 🔹 Grid 상태 변경 */
        case "SET_GRID_STATE":
            return { ...state, ...action.state }; // ✅ 새로운 상태 적용

        default:
            return state;
    }
}
export { gridReducer, initialGridState };
export type { GridState};
