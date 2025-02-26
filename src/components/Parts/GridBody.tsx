import React from "react";
import { GridColumn, GroupRow } from "../GridTypes";
import { GridState } from "../Reducer/GridReducer";
import { isGroupRowHelper } from "../Utility/GridUtility";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";

interface GridBodyProps<T> {
    gridState: GridState<T>;
    columns: GridColumn<T>[];
    showRowNumCol?: boolean;
    showRowCheckboxCol?: boolean;
    selectedRows: Set<T>;
    onToggleRow: (row: T) => void;
    onToggleGroupExpand: (groupKey: string) => void;
}

const GridBody = <T,>({
    gridState,
    columns,
    showRowNumCol = false,
    showRowCheckboxCol = false,
    selectedRows,
    onToggleRow,
    onToggleGroupExpand,
}: GridBodyProps<T>) => {    

    /** 🔹 그룹 Row 렌더링 (재귀 호출) */
    const renderGroupRow = (row: GroupRow<T>, level: number) => {
        const groupKey = row.__groupKey;
        const isExpanded = gridState.group.expanded.has(groupKey);
        let localRowIndex = 0; // ✅ 그룹 내부 Row Num 관리
    
        return (
            <React.Fragment key={`group-${groupKey}`}>
                <tr 
                    style={{
                        backgroundColor: "var(--color-second-hover)",
                        cursor: "pointer",
                        borderBottom: "2px solid var(--color-second)"
                    }}
                    onClick={() => onToggleGroupExpand(groupKey)}
                >
                    <td className="nh-table-cell" colSpan={columns.length + (showRowNumCol ? 1 : 0) + (showRowCheckboxCol ? 1 : 0)}>
                        <div 
                            style={{
                                display: "grid",
                                gridTemplateColumns: `${showRowNumCol ? "50px" : ""}${showRowCheckboxCol ? "50px" : ""}min-content ${columns.slice(1).map(col => col.width ? `${col.width}px` : "auto").join("")}`,
                                whiteSpace: "nowrap",
                                fontWeight: "bold",
                                alignItems: "center"
                            }}
                        >
                            <div style={{ display: "flex", alignItems: "center", paddingLeft: `${level * 16}px` }}>
                                <span style={{ marginRight: "4px" }}>{isExpanded ? <FaChevronDown /> : <FaChevronRight />}</span>
                                <span>{groupKey} ({row.__children.length})</span>
                            </div>
                        </div>
                    </td>
                </tr>
                    
                {/* ✅ 그룹이 확장된 경우 자식 데이터 렌더링 (재귀 호출) */}
                {isExpanded &&
                    row.__children.map((child) =>
                        isGroupRowHelper(child)
                            ? renderGroupRow(child as GroupRow<T>, level + 1)
                            : renderDataRow(child as T, level + 1, ++localRowIndex) // ✅ 그룹 내부 Row Num 증가
                    )}
            </React.Fragment>
        );
    };
    
    /** 🔹 일반 데이터 Row 렌더링 */
    const renderDataRow = (row: T, level: number, rowNum: number) => (
        <tr 
            key={JSON.stringify(row)}
            style={{ borderBottom: "1px solid var(--color-second-hover)" }}
        >
            {showRowNumCol ? <td className="nh-table-cell" style={{ textAlign: "center" }}>{rowNum}</td> : null}
            {showRowCheckboxCol ? (
                <td className="nh-table-cell" style={{ textAlign: "center" }}>
                    <input type="checkbox" checked={selectedRows.has(row)} onChange={() => onToggleRow(row)} style={{ cursor: "pointer" }} />
                </td>
            ) : null}
            {columns.map((col) => {
                const cellValue = col.renderCell ? col.renderCell(row) : row[col.key as keyof T];
                return (
                    <td 
                        key={String(col.key)}
                        className="nh-table-cell"
                        style={{ paddingLeft: `${level * 16}px` }}
                    >
                        {typeof cellValue === "object" && cellValue !== null ? JSON.stringify(cellValue) : String(cellValue ?? "")}
                    </td>
                );
            })}
        </tr>
    );
    
    

    return (
        <>
            <tbody>
                {gridState.data.map((row, index) =>
                    isGroupRowHelper(row)
                        ? renderGroupRow(row as GroupRow<T>, 0)
                        : renderDataRow(row as T, 0, index + 1)
                )}
            </tbody>
        </>

    );
};

export default GridBody;
