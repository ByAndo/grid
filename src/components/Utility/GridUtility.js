/**
 * 그룹 행인지 확인하는 헬퍼 함수
 * @param row 데이터 행 또는 그룹 행
 * @returns row가 그룹 행이면 true, 아니면 false
 */
const isGroupRowHelper = (row) => {
    return row.__group === true;
};
/**
 * 단일 컬럼 기준 정렬 함수
 * @param data 원본 데이터 배열
 * @param key 정렬할 컬럼 키
 * @param direction 정렬 방향 ("asc" | "desc")
 * @returns 정렬된 데이터 배열
 */
const sortData = (data, key, direction) => {
    if (!direction)
        return [...data];
    return [...data].sort((a, b) => {
        const aValue = a[key];
        const bValue = b[key];
        if (aValue == null || bValue == null)
            return 0; // 안전성 확보
        if (typeof aValue === "number" && typeof bValue === "number") {
            return direction === "asc" ? aValue - bValue : bValue - aValue;
        }
        const aStr = String(aValue).toLowerCase();
        const bStr = String(bValue).toLowerCase();
        return direction === "asc" ? aStr.localeCompare(bStr) : bStr.localeCompare(aStr);
    });
};
/**
 * 다중 컬럼 기준 안정 정렬 함수
 * @param data 원본 데이터 배열
 * @param keys 정렬할 컬럼 키 배열
 * @param directions 정렬 방향 ("asc" | "desc")
 * @returns 다중 정렬된 데이터 배열
 */
const stableMultiSort = (data, keys, directions) => {
    return [...data].sort((a, b) => {
        var _a, _b;
        let result = 0;
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            const direction = directions;
            const aValue = (_a = a[key]) !== null && _a !== void 0 ? _a : "";
            const bValue = (_b = b[key]) !== null && _b !== void 0 ? _b : "";
            if (typeof aValue === "number" && typeof bValue === "number") {
                result = aValue - bValue;
            }
            else {
                result = String(aValue).localeCompare(String(bValue));
            }
            if (direction === "desc")
                result = -result;
            if (result !== 0)
                return result;
        }
        return result;
    });
};
/**
 * 데이터 그룹핑 함수
 * @param data 원본 데이터 배열
 * @param groupKeys 그룹핑할 컬럼 키 배열
 * @param expandedKeys 확장된 그룹 키 Set
 * @param depth 현재 그룹의 깊이 (기본값: 0)
 * @returns 그룹핑된 데이터 배열
 */
const groupData = (data, groupKeys, expandedKeys = new Set(), depth = 0) => {
    if (groupKeys.length === depth)
        return data;
    const key = groupKeys[depth];
    const groupedData = [];
    const groupMap = new Map();
    data.forEach((item) => {
        const groupKey = String(item[key]);
        if (!groupMap.has(groupKey)) {
            groupMap.set(groupKey, {
                __group: true,
                __groupKey: groupKey,
                __children: [],
                __groupLevel: depth,
            });
        }
        groupMap.get(groupKey).__children.push(item);
    });
    groupMap.forEach((group) => {
        group.__children = groupData(group.__children, groupKeys, expandedKeys, depth + 1);
        groupedData.push(group);
        if (expandedKeys.has(group.__groupKey) && !groupedData.includes(group)) {
            groupedData.push(...group.__children);
        }
    });
    return groupedData;
};
/**
 * 데이터 필터링 함수
 * @param data 원본 데이터 배열
 * @param filters 필터 조건 객체 (컬럼 키: 필터 문자열)
 * @returns 필터링된 데이터 배열
 */
const filterData = (data, filters) => {
    return data.filter((item) => Object.entries(filters).every(([key, value]) => {
        if (!value)
            return true;
        const itemValue = String(item[key]).toLowerCase();
        return itemValue.includes(value.toLowerCase());
    }));
};
/**
 * 페이지네이션 적용 함수
 * @param data 원본 데이터 배열
 * @param currentPage 현재 페이지 번호
 * @param pageSize 페이지 크기
 * @param state GridState (선택 사항, 그룹핑/정렬에 활용)
 * @returns 페이지네이션이 적용된 데이터 배열
 */
const paginateData = (data, currentPage, pageSize, state) => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    let newData = [...data];
    if ((state === null || state === void 0 ? void 0 : state.group) !== undefined) {
        newData = stableMultiSort(newData, state === null || state === void 0 ? void 0 : state.group.column, (state === null || state === void 0 ? void 0 : state.sortDirection) === undefined ? "asc" : state === null || state === void 0 ? void 0 : state.sortDirection);
    }
    return newData.slice(startIndex, endIndex);
};
/**
 * Grid 상태 변경 시 적용되는 데이터 가공 함수
 * @param state 현재 Grid 상태 객체
 * @returns 새로운 GridState 객체
 */
const gridStateChanges = (state) => {
    let processedData = [...state.originalData];
    if (Object.keys(state.filters).length > 0) {
        processedData = filterData(processedData, state.filters);
    }
    if (state.sortedColumn && state.sortDirection) {
        processedData = sortData(processedData, state.sortedColumn, state.sortDirection);
    }
    processedData = paginateData(processedData, state.pagenate.currentPage, state.pagenate.pageSize, state);
    if (state.group.column.length > 0) {
        processedData = groupData(processedData, state.group.column, state.group.expanded);
    }
    return Object.assign(Object.assign({}, state), { data: processedData });
};
/**
 * 원본 데이터에 rowKey를 추가하는 함수
 * @param data 원본 데이터 배열
 * @returns rowKey가 추가된 새로운 데이터 배열
 */
export const setRowKeysForOrginData = (data) => {
    return data.map((row, index) => {
        var _a;
        return (Object.assign(Object.assign({}, row), { rowKey: (_a = row.id) !== null && _a !== void 0 ? _a : `row-${Date.now()}-${Math.random()}-${index}` }));
    });
};
export { isGroupRowHelper, sortData, groupData, filterData, gridStateChanges, paginateData };
