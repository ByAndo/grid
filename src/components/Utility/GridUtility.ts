
import { GroupRow, SortDirection } from "../GridTypes";
import { GridState } from "../Reducer/GridReducer";
/**
 * 그룹 행인지 확인하는 헬퍼 함수
 * @param row 데이터 행 또는 그룹 행
 * @returns row가 그룹 행이면 true, 아니면 false
 */
const isGroupRowHelper = <T,>(row: T | GroupRow<T>): row is GroupRow<T> => {
    return (row as GroupRow<T>).__group === true;
};

/**
 * 단일 컬럼 기준 정렬 함수
 * @param data 원본 데이터 배열
 * @param key 정렬할 컬럼 키
 * @param direction 정렬 방향 ("asc" | "desc")
 * @returns 정렬된 데이터 배열
 */
const sortData = <T>(data: T[], key: keyof T, direction: SortDirection): T[] => {
    if (!direction) return [...data];

    return [...data].sort((a, b) => {
        const aValue = a[key];
        const bValue = b[key];

        if (aValue == null || bValue == null) return 0; // 안전성 확보

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
const stableMultiSort = <T>(data: T[], keys: (keyof T)[], directions: SortDirection): T[] => {
    return [...data].sort((a, b) => {
        let result = 0;
        
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            const direction = directions;

            const aValue = a[key] ?? "";
            const bValue = b[key] ?? "";

            if (typeof aValue === "number" && typeof bValue === "number") {
                result = aValue - bValue;
            } else {
                result = String(aValue).localeCompare(String(bValue));
            }

            if (direction === "desc") result = -result;
            if (result !== 0) return result;
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
const groupData = <T>(
    data: T[],
    groupKeys: string[],
    expandedKeys: Set<string> = new Set<string>(),
    depth: number = 0
): (T | GroupRow<T>)[] => {
    if (groupKeys.length === depth) return data; 

    const key = groupKeys[depth];
    const groupedData: (T | GroupRow<T>)[] = [];
    const groupMap = new Map<string, GroupRow<T>>();

    data.forEach((item) => {
        const groupKey = String(item[key as keyof T]);

        if (!groupMap.has(groupKey)) {
            groupMap.set(groupKey, {
                __group: true,
                __groupKey: groupKey,
                __children: [],
                __groupLevel: depth,
            });
        }

        groupMap.get(groupKey)!.__children.push(item);
    });

    groupMap.forEach((group) => {
        group.__children = groupData(group.__children as T[], groupKeys, expandedKeys, depth + 1);
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
const filterData = <T>(data: T[], filters: Record<string, string>): T[] => {
    return data.filter((item) =>
        Object.entries(filters).every(([key, value]) => {
            if (!value) return true;
            const itemValue = String(item[key as keyof T]).toLowerCase();
            return itemValue.includes(value.toLowerCase());
        })
    );
};

/**
 * 페이지네이션 적용 함수
 * @param data 원본 데이터 배열
 * @param currentPage 현재 페이지 번호
 * @param pageSize 페이지 크기
 * @param state GridState (선택 사항, 그룹핑/정렬에 활용)
 * @returns 페이지네이션이 적용된 데이터 배열
 */
const paginateData = <T>(
    data: T[], 
    currentPage: number, 
    pageSize: number,
    state?: GridState<T>     
): T[] => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    let newData: T[] = [...data];

    if (state?.group !== undefined) {        
        newData = stableMultiSort(
            newData, 
            state?.group.column as (keyof T)[], 
            state?.sortDirection === undefined ? "asc" : state?.sortDirection);
    }
    
    return newData.slice(startIndex, endIndex);
};

/**
 * Grid 상태 변경 시 적용되는 데이터 가공 함수
 * @param state 현재 Grid 상태 객체
 * @returns 새로운 GridState 객체
 */
const gridStateChanges = <T>(state: GridState<T>): GridState<T> => {
    let processedData: (T | GroupRow<T>)[] = [...state.originalData];

    if (Object.keys(state.filters).length > 0) {
        processedData = filterData(processedData, state.filters);
    }

    if (state.sortedColumn && state.sortDirection) {
        processedData = sortData(processedData as T[], state.sortedColumn as keyof T, state.sortDirection);
    }

    processedData = paginateData(
        processedData, 
        state.pagenate.currentPage, 
        state.pagenate.pageSize,
        state     
    );

    if (state.group.column.length > 0) {
        processedData = groupData(processedData as T[], state.group.column, state.group.expanded);
    }

    return {
        ...state,
        data: processedData as T[],
    };
};

/**
 * 원본 데이터에 rowKey를 추가하는 함수
 * @param data 원본 데이터 배열
 * @returns rowKey가 추가된 새로운 데이터 배열
 */
export const setRowKeysForOrginData = <T>(data: Array<T>): Array<T & { rowKey: string }> => {
    return data.map((row, index) => ({
        ...row,
        rowKey: (row as any).id ?? `row-${Date.now()}-${Math.random()}-${index}`, 
    }));
};








export {isGroupRowHelper, sortData, groupData, filterData, gridStateChanges, paginateData}
  