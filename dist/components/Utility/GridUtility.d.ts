import { GroupRow, SortDirection } from "../GridTypes";
import { GridState } from "../Reducer/GridReducer";
/**
 * 그룹 행인지 확인하는 헬퍼 함수
 * @param row 데이터 행 또는 그룹 행
 * @returns row가 그룹 행이면 true, 아니면 false
 */
declare const isGroupRowHelper: <T>(row: T | GroupRow<T>) => row is GroupRow<T>;
/**
 * 단일 컬럼 기준 정렬 함수
 * @param data 원본 데이터 배열
 * @param key 정렬할 컬럼 키
 * @param direction 정렬 방향 ("asc" | "desc")
 * @returns 정렬된 데이터 배열
 */
declare const sortData: <T>(data: T[], key: keyof T, direction: SortDirection) => T[];
/**
 * 데이터 그룹핑 함수
 * @param data 원본 데이터 배열
 * @param groupKeys 그룹핑할 컬럼 키 배열
 * @param expandedKeys 확장된 그룹 키 Set
 * @param depth 현재 그룹의 깊이 (기본값: 0)
 * @returns 그룹핑된 데이터 배열
 */
declare const groupData: <T>(data: T[], groupKeys: string[], expandedKeys?: Set<string>, depth?: number) => (T | GroupRow<T>)[];
/**
 * 데이터 필터링 함수
 * @param data 원본 데이터 배열
 * @param filters 필터 조건 객체 (컬럼 키: 필터 문자열)
 * @returns 필터링된 데이터 배열
 */
declare const filterData: <T>(data: T[], filters: Record<string, string>) => T[];
/**
 * 페이지네이션 적용 함수
 * @param data 원본 데이터 배열
 * @param currentPage 현재 페이지 번호
 * @param pageSize 페이지 크기
 * @param state GridState (선택 사항, 그룹핑/정렬에 활용)
 * @returns 페이지네이션이 적용된 데이터 배열
 */
declare const paginateData: <T>(data: T[], currentPage: number, pageSize: number, state?: GridState<T>) => T[];
/**
 * Grid 상태 변경 시 적용되는 데이터 가공 함수
 * @param state 현재 Grid 상태 객체
 * @returns 새로운 GridState 객체
 */
declare const gridStateChanges: <T>(state: GridState<T>) => GridState<T>;
/**
 * 원본 데이터에 rowKey를 추가하는 함수
 * @param data 원본 데이터 배열
 * @returns rowKey가 추가된 새로운 데이터 배열
 */
export declare const setRowKeysForOrginData: <T>(data: Array<T>) => Array<T & {
    rowKey: string;
}>;
export { isGroupRowHelper, sortData, groupData, filterData, gridStateChanges, paginateData };
