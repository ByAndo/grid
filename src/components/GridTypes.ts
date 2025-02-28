import { ReactNode } from "react";

/** 🔹 Grid 컬럼 설정 인터페이스 */
interface GridColumn<T> {        

    /** 컬럼의 고유 키 (데이터 매핑용 필수 값) */
    key: string;
  
    /** 컬럼 헤더에 표시될 이름 */
    label: string;
  
    /** 컬럼의 너비 (픽셀 단위, 기본값: 자동) */
    width?: number;
  
    /** 컬럼 내 텍스트 정렬 방식 (기본값: left) */
    align?: "left" | "center" | "right";
  
    /** 컬럼 정렬 가능 여부 (true이면 정렬 기능 활성화) */
    sortable?: boolean;
  
    /** 컬럼 필터 가능 여부 (true이면 필터 기능 활성화) */
    filterable?: boolean;

    /** 수정 가능 컬럼 여부 (기본 true : 수정 가능) */
    editable?: boolean
  
    /** 컬럼 크기 조절 가능 여부 (true이면 사용자가 크기 조정 가능) */
    resizable?: boolean;
  
    /** 커스텀 셀 렌더링 함수 */
    renderCell?: (rowData: T) => React.ReactNode;
  
    /** 기본 제공 format 타입 */
    format?: "text" | "number" | "date" | "boolean";
  
    /** 추가 변환 함수 */
    formatF?: (value: T[keyof T], rowData: T) => string | number;
  
    /** 컬럼을 좌측("left") 또는 우측("right")에 고정 */
    sticky?: "left" | "right";
  
    /** 컬럼 기본 숨김 여부 (true이면 Grid에서 표시되지 않음) */
    hidden?: boolean;
  
    /** 컬럼 헤더에 표시할 설명 툴팁 (마우스 호버 시 노출) */
    tooltip?: string;
  
    /** 컬럼에 적용할 추가 CSS 클래스 */
    className?: string;
  
    /** 행 데이터에 따라 셀 스타일 적용 */
    cellStyle?: (rowData: T) => React.CSSProperties;
}

/** 🔹 Grid 페이징 설정 인터페이스 */
interface GridPaginationProps {    
    /** 한 페이지에 표시할 Row 수 (기본값: 20) */
    pageSize: number;

    /** 현재 페이지 (기본값: 1) */
    currentPage: number;

    /** 페이지 변경 시 호출되는 콜백 함수 */
    onPageChange?: (page: number) => void;
}

/** 🔹 Grid 전역 옵션 설정 인터페이스 */
interface GridOptions {    
    /** 전체 Grid에서 정렬 기능 활성화 여부 (기본값: false) */
    sortable?: boolean;
  
    /** 전체 Grid에서 필터 기능 활성화 여부 (기본값: false) */
    filterable?: boolean;
  
    /** 전체 Grid에서 컬럼 크기 조절 활성화 여부 (기본값: false) */
    resizable?: boolean;
  
    /** 전체 Grid에서 그룹핑 기능 활성화 여부 (기본값: false) */
    grouping?: boolean;

    /** 컨텍스트 메뉴 언어 설정 */
    contextMenuLabels?: {
        /** 오름차순 정렬 메뉴 Label 설정 */
        sortAsc?: string; 

        /** 내림차순 정렬 메뉴 Label 설정 */
        sortDesc?: string;

        /** 정렬 해제 메뉴 Label 설정 */
        clearSort?: string; 

        /** 필터 설정 메뉴 Label 설정 */
        filter?: string; 

        /** 필터 해제 메뉴 Label 설정 */
        clearFilter?: string; 

        /** 그룹 설정 메뉴 Label 설정 */
        group?: string; 

        /** 그룹 해제 메뉴 Label 설정 */
        ungroup?: string; 

        /** PDF 내보내기 메뉴 Label 설정 */
        exportPDF?: string; 

        /** Excel 내보내기 메뉴 Label 설정 */
        exportExcel?: string; 
    };

}

/** 🔹 Grid 컴포넌트 Props 인터페이스 */
interface GridProps<T> {
    /** 컬럼 목록 */
    columns: GridColumn<T>[];

    /** 표시할 데이터 (기존 `rows` → `data`) */
    data: T[];
    
    /** 페이징 활성화 (기본값: false) */
    pagingable? : boolean

    /** 페이징 설정 (pagingable = true 일때만 적용) */
    pagination?: GridPaginationProps;

    /** Grid 전역 옵션 (정렬, 필터, 리사이즈, 그룹핑 등) */
    options?: GridOptions;

    /** Row 번호 컬럼 활성화 여부 (기본값: false) */
    showRowNumCol?: boolean;

    /** Row 체크박스 컬럼 활성화 여부 (기본값: false) */
    showRowCheckboxCol?: boolean;

    /** Cell Edit Mode 활성화 (기본값: false) */
    isCellEditable?: boolean;
}
interface GridGroupState {
    column : string [];
    expanded : Set<string>;
}

interface GroupRow<T> {
    __group: true;
    __groupKey: string;
    __children: (T | GroupRow<T>)[];
    __groupLevel: number;
}


/** 🔹context 정의 */
export interface ContextMenuItem {
  label?: string;
  icon?: string | ReactNode; // ✅ 아이콘 추가 (string, ReactIcon, 일반 ReactNode)
  onClick?: () => void;
  divider?: boolean;
  disabled?: boolean; // ✅ 비활성화 속성 추가
}
/** 🔹 정렬 방향 타입 정의 */
type SortDirection = "asc" | "desc" | null;


/** ✅ GridTypes.ts에서만 사용 가능하도록 묶어서 export */
export type { 
    GridColumn, 
    GridPaginationProps, 
    GridOptions, 
    GridProps, 
    GroupRow,
    GridGroupState,
    SortDirection
};
  