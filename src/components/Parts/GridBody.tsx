import React from "react";
import { GridColumn, GroupRow } from "../GridTypes";
import { isGroupRowHelper } from "../Utility/GridUtility";
import { FaCheck, FaChevronDown, FaChevronRight, FaUndo } from "react-icons/fa";
import { GridReducerReturn } from "../Reducer/useGridReducer";

interface GridBodyProps<T> {    
    columns: GridColumn<T>[];
    isCellEditable?: boolean;
    showRowNumCol?: boolean;
    showRowCheckboxCol?: boolean;
    selectedRows: Set<T>;
    onToggleRow: (row: T) => void;
    onToggleGroupExpand: (groupKey: string) => void;
    reducer : GridReducerReturn<T>;
    style?: React.CSSProperties;
}

const GridBody = <T,>({    
    columns,
    showRowNumCol = false,
    showRowCheckboxCol = false,
    selectedRows,
    isCellEditable = false,
    onToggleRow,
    onToggleGroupExpand,
    reducer,
    style,
}: GridBodyProps<T>) => {      

    /** 🔹 셀 편집 모드 활성화 */
    const handleCellDoubleClick = (rowKey: string, colKey: string, value: any) => {
        reducer.setEditingCell( rowKey, colKey, value ); // ✅ 값까지 저장!
    };
    /** 🔹 셀 값 변경 */
    const handleCellChange = (newValue: string) => {        
    
        if (!reducer.state.editingCell) return; // ✅ editingCell이 없으면 종료
    
        const { rowKey, colKey } = reducer.state.editingCell;

        // ✅ 즉시 UI에 반영되도록 `editingCell`도 업데이트
        reducer.setEditingCell(rowKey, colKey, newValue);
    
        // ✅ 원본 데이터에서 해당 행 찾기
        const originalRow = (reducer.state.originalData as Array<T & { rowKey: string }>)
            .find((row) => row.rowKey === rowKey);
        const originalValue = originalRow ? originalRow[colKey as keyof T] : undefined;
    
        // ✅ 원본 값과 다를 때만 저장
        if (originalValue !== newValue) {
            reducer.editCell(rowKey, colKey, newValue);     
        } else {
            reducer.removeEditedCell(rowKey, colKey);
        }
    };
    
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, row: T) => {
        if (!reducer.state.editingCell) return;
    
        const { rowKey, colKey } = reducer.state.editingCell;
        const columnIndex = columns.findIndex((col) => col.key === colKey);
    
        if (e.key === "Enter") {
            reducer.clearEditingCell(); // ✅ 현재 셀 편집 종료
        }
    
        if (e.key === "Tab") {
            e.preventDefault(); // ✅ 기본 탭 동작 방지
    
            // ✅ 다음 수정 가능한 컬럼 찾기
            for (let i = columnIndex + 1; i < columns.length; i++) {
                if (columns[i].editable !== false) {
                    reducer.clearEditingCell();
                    reducer.setEditingCell(rowKey, columns[i].key, row[columns[i].key as keyof T]); // ✅ 다음 셀 편집 모드로 이동
                    return;
                }
            }
    
            // ✅ 다음 수정 가능한 셀이 없으면 편집 종료
            reducer.clearEditingCell();
        }
    };
    
    

    /** 🔹 그룹 Row 렌더링 (재귀 호출) */
    const renderGroupRow = (row: GroupRow<T>, level: number) => {
        const groupKey = row.__groupKey;
        const isExpanded = reducer.state.group.expanded.has(groupKey);
        let localRowIndex : number = 0;
    
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
    const renderDataRow = (row: T, level: number, rowNum: number) => {
        const rowKey = (row as any).id ?? JSON.stringify(row);
        const isEditing = (colKey: string) => reducer.state.editingCell?.rowKey === rowKey && reducer.state.editingCell?.colKey === colKey;
        const isRowEdited = reducer.state.editedRows[rowKey] !== undefined; // ✅ 수정된 행인지 체크
        const showActionColumn = isCellEditable && Object.keys(reducer.state.editedRows).length > 0;

    
        return (
            <tr key={rowKey} style={{ borderBottom: "1px solid var(--color-second-hover)" }}>
                {/* ✅ 수정된 행만 버튼 표시 */}
                {showActionColumn && (
                    <td className="nh-table-cell nh-action-cell">
                        {isRowEdited && (
                            <>
                                <button className="nh-btn nh-btn-apply" onClick={() => reducer.applyRowChanges(rowKey)}><FaCheck /></button>
                                <button className="nh-btn nh-btn-reset" onClick={() => reducer.resetRowChanges(rowKey)}><FaUndo /></button>
                            </>
                        )}
                    </td>
                )}
                {/* Check Box */}
                {showRowCheckboxCol ? (
                    <td className="nh-table-cell text-center">
                        <input type="checkbox" checked={selectedRows.has(row)} onChange={() => onToggleRow(row)} />
                    </td>
                ) : null}
                {/* Row Num */}
                {showRowNumCol ? <td className="nh-table-cell text-center">{rowNum}</td> : null}

    
                {columns.map((col) => {
                    const cellKey = `${rowKey}-${col.key}`;
                    const cellValue = isEditing(col.key) 
                        ? reducer.state.editingCell?.value 
                        : reducer.state.editedRows[rowKey]?.[col.key as keyof T] ?? (col.renderCell ? col.renderCell(row) : row[col.key as keyof T]);
    
                    return (
                        <td 
                            key={col.key}
                            className="nh-table-cell"
                            style={{
                                paddingLeft: `${level * 16}px`,
                                fontWeight: reducer.state.editedRows[rowKey]?.[col.key as keyof T] !== undefined ? "bold" : "normal",
                                color: reducer.state.editedRows[rowKey]?.[col.key as keyof T] !== undefined ? "red" : "inherit",
                            }}
                            onDoubleClick={() => isCellEditable && handleCellDoubleClick(rowKey, col.key, cellValue)}
                        >
                            {isEditing(col.key) ? (
                                <input
                                    type="text"
                                    value={reducer.state.editingCell?.value ?? ""}
                                    onChange={(e) => handleCellChange(e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(e, row)}
                                    className="nh-edit-input"
                                />
                            ) : (
                                cellValue
                            )}
                        </td>
                    );
                })}
            </tr>
        );
    };
    
    
    // const renderDataRow = (row: T, level: number, rowNum: number) => (
    //     <tr 
    //         key={JSON.stringify(row)}
    //         style={{ borderBottom: "1px solid var(--color-second-hover)" }}
    //     >
    //         {showRowNumCol ? <td className="nh-table-cell" style={{ textAlign: "center" }}>{rowNum}</td> : null}
    //         {showRowCheckboxCol ? (
    //             <td className="nh-table-cell" style={{ textAlign: "center" }}>
    //                 <input type="checkbox" checked={selectedRows.has(row)} onChange={() => onToggleRow(row)} style={{ cursor: "pointer" }} />
    //             </td>
    //         ) : null}
    //         {columns.map((col) => {
    //             const cellValue = col.renderCell ? col.renderCell(row) : row[col.key as keyof T];
    //             return (
    //                 <td 
    //                     key={String(col.key)}
    //                     className="nh-table-cell"
    //                     style={{ paddingLeft: `${level * 16}px` }}
    //                 >
    //                     {typeof cellValue === "object" && cellValue !== null ? JSON.stringify(cellValue) : String(cellValue ?? "")}
    //                 </td>
    //             );
    //         })}
    //     </tr>
    // );
    

    return (
        <>
            <tbody style={style}>
                {reducer.state.data.map((row, index) =>
                    isGroupRowHelper(row)
                        ? renderGroupRow(row as GroupRow<T>, 0)
                        : renderDataRow(row as T, 0, index + 1)
                )}
            </tbody>
        </>

    );
};

export default GridBody;
