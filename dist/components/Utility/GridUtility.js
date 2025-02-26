const isGroupRowHelper = (row) => {
    return row.__group === true;
};
const sortData = (data, key, direction) => {
    if (!direction)
        return [...data]; // 정렬 방향이 없으면 원본 그대로 반환
    return [...data].sort((a, b) => {
        const aValue = a[key];
        const bValue = b[key];
        // undefined 또는 null 체크 (안전성 추가)
        if (aValue == null || bValue == null)
            return 0;
        if (typeof aValue === "number" && typeof bValue === "number") {
            return direction === "asc" ? aValue - bValue : bValue - aValue;
        }
        const aStr = String(aValue).toLowerCase();
        const bStr = String(bValue).toLowerCase();
        return direction === "asc" ? aStr.localeCompare(bStr) : bStr.localeCompare(aStr);
    });
};
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
                return result; // 첫 번째 키가 다르면 여기서 정렬 종료
        }
        return result;
    });
};
const groupData = (data, groupKeys, expandedKeys = new Set(), depth = 0) => {
    if (groupKeys.length === depth)
        return data; // 마지막 그룹이면 원본 데이터 반환
    const key = groupKeys[depth]; // 현재 그룹 컬럼 가져오기
    const groupedData = [];
    const groupMap = new Map();
    data.forEach((item) => {
        const groupKey = String(item[key]); // 현재 그룹 키
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
        // ✅ 기존 그룹을 다시 그룹핑 (재귀 호출)
        group.__children = groupData(group.__children, groupKeys, expandedKeys, depth + 1);
        groupedData.push(group); // ✅ 그룹을 추가
        // ✅ 중복 방지: expandedKeys에 포함된 경우만 추가
        if (expandedKeys.has(group.__groupKey) && !groupedData.includes(group)) {
            groupedData.push(...group.__children);
        }
    });
    return groupedData;
};
const filterData = (data, filters) => {
    return data.filter((item) => Object.entries(filters).every(([key, value]) => {
        if (!value)
            return true; // 필터 값이 비어있으면 패스
        const itemValue = String(item[key]).toLowerCase();
        return itemValue.includes(value.toLowerCase());
    }));
};
const paginateData = (data, currentPage, pageSize, state) => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    let newData = [...data];
    if ((state === null || state === void 0 ? void 0 : state.group) !== undefined) {
        newData = stableMultiSort(newData, state === null || state === void 0 ? void 0 : state.group.column, (state === null || state === void 0 ? void 0 : state.sortDirection) === undefined ? "asc" : state === null || state === void 0 ? void 0 : state.sortDirection);
    }
    return newData.slice(startIndex, endIndex);
};
const gridStateChanges = (state) => {
    let processedData = [...state.originalData];
    // 1️⃣ 필터 적용 (필터 기능 추가 가능)
    if (Object.keys(state.filters).length > 0) {
        processedData = filterData(processedData, state.filters);
    }
    // 2️⃣ 정렬 적용
    if (state.sortedColumn && state.sortDirection) {
        processedData = sortData(processedData, state.sortedColumn, state.sortDirection);
    }
    // 4️⃣ 페이지네이션 적용    
    processedData = paginateData(processedData, state.pagenate.currentPage, state.pagenate.pageSize, state);
    // 3️⃣ 그룹핑 적용
    if (state.group.column.length > 0) {
        processedData = groupData(processedData, state.group.column, state.group.expanded);
    }
    return Object.assign(Object.assign({}, state), { data: processedData });
};
export { isGroupRowHelper, sortData, groupData, filterData, gridStateChanges, paginateData };
