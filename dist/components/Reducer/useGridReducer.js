import { useReducer } from "react";
import { gridReducer, initialGridState } from "./GridReducer";
import { gridStateChanges } from "../Utility/GridUtility";
/** 🔹 useGridReducer 훅 */
function useGridReducer(data, pagingable = false, pageSize = 10) {
    const [state, dispatch] = useReducer((gridReducer), initialGridState(data, pagingable, pageSize));
    /** 🔹 컬럼 정렬 변경 */
    const setSort = (column, direction) => {
        dispatch({
            type: "SET_GRID_STATE",
            state: gridStateChanges(Object.assign(Object.assign({}, state), { sortedColumn: column, sortDirection: direction }))
        });
    };
    /** 🔹 특정 컬럼에 필터 적용 */
    const setFilter = (filters) => {
        const newFilters = Object.assign(Object.assign({}, state.filters), filters);
        dispatch({
            type: "SET_GRID_STATE",
            state: gridStateChanges(Object.assign(Object.assign({}, state), { filters: newFilters }))
        });
    };
    /** 🔹 특정 컬럼의 필터 제거 */
    const clearFilter = (column) => {
        const newFilters = Object.assign({}, state.filters);
        delete newFilters[column];
        dispatch({
            type: "SET_GRID_STATE",
            state: gridStateChanges(Object.assign(Object.assign({}, state), { filters: newFilters }))
        });
    };
    /** 🔹 컬럼을 그룹핑 */
    const setGroup = (column) => {
        dispatch({
            type: "SET_GRID_STATE",
            state: gridStateChanges(Object.assign(Object.assign({}, state), { group: Object.assign(Object.assign({}, state.group), { column: [...state.group.column, column] }) }))
        });
    };
    /** 🔹 컬럼 그룹핑 해제 */
    const removeGroup = (column) => {
        dispatch({
            type: "SET_GRID_STATE",
            state: gridStateChanges(Object.assign(Object.assign({}, state), { group: Object.assign(Object.assign({}, state.group), { column: state.group.column.filter(c => c !== column) }) }))
        });
    };
    /** 🔹 특정 Row 선택/해제 */
    const toggleRow = (row) => {
        dispatch({ type: "TOGGLE_ROW", row });
    };
    /** 🔹 Group Expend */
    const expandGroup = (column) => {
        const newExpanded = new Set(state.group.expanded);
        if (newExpanded.has(column)) {
            newExpanded.delete(column); // ✅ 이미 열려 있으면 닫기
        }
        else {
            newExpanded.add(column); // ✅ 닫혀 있으면 열기
        }
        // ✅ 변경된 그룹 상태를 반영하여 데이터 갱신
        dispatch({
            type: "SET_GRID_STATE",
            state: gridStateChanges(Object.assign(Object.assign({}, state), { group: Object.assign(Object.assign({}, state.group), { expanded: newExpanded }) }))
        });
    };
    /** 🔹 페이지 변경 */
    const setPage = (page) => {
        dispatch({
            type: "SET_GRID_STATE",
            state: gridStateChanges(Object.assign(Object.assign({}, state), { pagenate: Object.assign(Object.assign({}, state.pagenate), { currentPage: page }) }))
        });
    };
    /** 🔹 페이지 크기 변경 */
    const setPageSize = (pageSize) => {
        dispatch({
            type: "SET_GRID_STATE",
            state: gridStateChanges(Object.assign(Object.assign({}, state), { pagenate: Object.assign(Object.assign({}, state.pagenate), { pageSize: pageSize }) }))
        });
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
        setPageSize
    };
}
export { useGridReducer };
