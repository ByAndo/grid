import { groupData, paginateData, sortData } from "../Utility/GridUtility";
/** 🔹 초기 상태 값 */
const initialGridState = (data, pagingable, pageSize) => {
    return {
        originalData: [...data],
        data: pagingable ? paginateData(data, 1, pageSize) : data, // ✅ 페이징 시 빈 Set 사용
        sortedColumn: null,
        sortDirection: null,
        filters: {},
        group: {
            column: [],
            expanded: new Set, // ✅ 초기 확장 상태 저장
        },
        selectedRows: new Set(),
        pagenate: {
            pageSize: pageSize,
            currentPage: 1,
        },
    };
};
/** 🔹 Grid 리듀서 함수 */
function gridReducer(state, action) {
    switch (action.type) {
        /** 🔹 컬럼 정렬 변경 */
        case "SET_SORT":
            // 현재 정렬 상태 확인            
            {
                return Object.assign(Object.assign({}, state), { sortedColumn: action.column, sortDirection: action.direction, data: action.direction === null
                        ? [...state.originalData] // ✅ 정렬 해제 시 원본 데이터로 복구
                        : sortData(state.originalData, action.column, action.direction) });
            }
        /** 🔹 특정 컬럼에 필터 적용 */
        case "SET_FILTER": {
            const newFilters = Object.assign(Object.assign({}, state.filters), action.filters // 새로운 필터 추가 or 업데이트
            );
            return Object.assign(Object.assign({}, state), { filters: newFilters });
        }
        /** 🔹 특정 컬럼의 필터 제거 */
        case "CLEAR_FILTER": {
            return Object.assign(Object.assign({}, state), { filters: Object.fromEntries(Object.entries(state.filters).filter(([key]) => key !== action.column)) });
        }
        /** 🔹 컬럼을 그룹핑 */
        case "SET_GROUP": {
            const newGroupedColumns = [...state.group.column, action.column];
            return Object.assign(Object.assign({}, state), { group: Object.assign(Object.assign({}, state.group), { column: newGroupedColumns, expanded: new Set(state.group.expanded) }), data: groupData(state.originalData, newGroupedColumns) });
        }
        /** 🔹 컬럼 그룹핑 해제 */
        case "REMOVE_GROUP": {
            const newGroupedColumns = state.group.column.filter((col) => col !== action.column);
            const newExpanded = new Set(state.group.expanded);
            // ✅ 해당 그룹이 해제되면 펼쳐진 상태에서도 제거
            newExpanded.delete(action.column);
            return Object.assign(Object.assign({}, state), { group: {
                    column: newGroupedColumns, // ✅ 그룹 컬럼에서 제거
                    expanded: newExpanded, // ✅ 확장 목록에서도 제거
                }, data: newGroupedColumns.length > 0
                    ? groupData(state.originalData, newGroupedColumns, newExpanded) // ✅ 남은 그룹이 있으면 다시 그룹핑
                    : [...state.originalData] });
        }
        case "TOGGLE_ROW": {
            return Object.assign({}, state);
        }
        /** 🔹 특정 Row 선택/해제 */
        case "TOGGLE_GROUP_EXPAND": {
            const newExpanded = new Set(state.group.expanded);
            if (newExpanded.has(action.column)) {
                newExpanded.delete(action.column); // ✅ 이미 열려 있으면 닫기
            }
            else {
                newExpanded.add(action.column); // ✅ 닫혀 있으면 열기
            }
            return Object.assign(Object.assign({}, state), { group: Object.assign(Object.assign({}, state.group), { expanded: newExpanded }) });
        }
        /** 🔹 페이지 변경 */
        case "SET_PAGE": {
            return Object.assign(Object.assign({}, state), { pagenate: Object.assign(Object.assign({}, state.pagenate), { currentPage: action.page }) });
        }
        /** 🔹 페이지 변경 */
        case "SET_PAGE_SIZE": {
            return Object.assign(Object.assign({}, state), { pagenate: Object.assign(Object.assign({}, state.pagenate), { pageSize: action.pageSize }) });
        }
        /** 🔹 Grid 상태 변경 */
        case "SET_GRID_STATE":
            return Object.assign(Object.assign({}, state), action.state); // ✅ 새로운 상태 적용
        default:
            return state;
    }
}
export { gridReducer, initialGridState };
