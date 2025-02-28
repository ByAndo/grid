import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React from "react";
import { isGroupRowHelper } from "../Utility/GridUtility";
import { FaCheck, FaChevronDown, FaChevronRight, FaUndo } from "react-icons/fa";
const GridBody = ({ columns, showRowNumCol = false, showRowCheckboxCol = false, selectedRows, isCellEditable = false, onToggleRow, onToggleGroupExpand, reducer, style, }) => {
    /** 🔹 셀 편집 모드 활성화 */
    const handleCellDoubleClick = (rowKey, colKey, value) => {
        reducer.setEditingCell(rowKey, colKey, value); // ✅ 값까지 저장!
    };
    /** 🔹 셀 값 변경 */
    const handleCellChange = (newValue) => {
        if (!reducer.state.editingCell)
            return; // ✅ editingCell이 없으면 종료
        const { rowKey, colKey } = reducer.state.editingCell;
        // ✅ 즉시 UI에 반영되도록 `editingCell`도 업데이트
        reducer.setEditingCell(rowKey, colKey, newValue);
        // ✅ 원본 데이터에서 해당 행 찾기
        const originalRow = reducer.state.originalData
            .find((row) => row.rowKey === rowKey);
        const originalValue = originalRow ? originalRow[colKey] : undefined;
        // ✅ 원본 값과 다를 때만 저장
        if (originalValue !== newValue) {
            reducer.editCell(rowKey, colKey, newValue);
        }
        else {
            reducer.removeEditedCell(rowKey, colKey);
        }
    };
    const handleKeyDown = (e, row) => {
        if (!reducer.state.editingCell)
            return;
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
                    reducer.setEditingCell(rowKey, columns[i].key, row[columns[i].key]); // ✅ 다음 셀 편집 모드로 이동
                    return;
                }
            }
            // ✅ 다음 수정 가능한 셀이 없으면 편집 종료
            reducer.clearEditingCell();
        }
    };
    /** 🔹 그룹 Row 렌더링 (재귀 호출) */
    const renderGroupRow = (row, level) => {
        const groupKey = row.__groupKey;
        const isExpanded = reducer.state.group.expanded.has(groupKey);
        let localRowIndex = 0;
        return (_jsxs(React.Fragment, { children: [_jsx("tr", { style: {
                        backgroundColor: "var(--color-second-hover)",
                        cursor: "pointer",
                        borderBottom: "2px solid var(--color-second)"
                    }, onClick: () => onToggleGroupExpand(groupKey), children: _jsx("td", { className: "nh-table-cell", colSpan: columns.length + (showRowNumCol ? 1 : 0) + (showRowCheckboxCol ? 1 : 0), children: _jsx("div", { style: {
                                display: "grid",
                                gridTemplateColumns: `${showRowNumCol ? "50px" : ""}${showRowCheckboxCol ? "50px" : ""}min-content ${columns.slice(1).map(col => col.width ? `${col.width}px` : "auto").join("")}`,
                                whiteSpace: "nowrap",
                                fontWeight: "bold",
                                alignItems: "center"
                            }, children: _jsxs("div", { style: { display: "flex", alignItems: "center", paddingLeft: `${level * 16}px` }, children: [_jsx("span", { style: { marginRight: "4px" }, children: isExpanded ? _jsx(FaChevronDown, {}) : _jsx(FaChevronRight, {}) }), _jsxs("span", { children: [groupKey, " (", row.__children.length, ")"] })] }) }) }) }), isExpanded &&
                    row.__children.map((child) => isGroupRowHelper(child)
                        ? renderGroupRow(child, level + 1)
                        : renderDataRow(child, level + 1, ++localRowIndex) // ✅ 그룹 내부 Row Num 증가
                    )] }, `group-${groupKey}`));
    };
    /** 🔹 일반 데이터 Row 렌더링 */
    const renderDataRow = (row, level, rowNum) => {
        var _a;
        const rowKey = (_a = row.id) !== null && _a !== void 0 ? _a : JSON.stringify(row);
        const isEditing = (colKey) => { var _a, _b; return ((_a = reducer.state.editingCell) === null || _a === void 0 ? void 0 : _a.rowKey) === rowKey && ((_b = reducer.state.editingCell) === null || _b === void 0 ? void 0 : _b.colKey) === colKey; };
        const isRowEdited = reducer.state.editedRows[rowKey] !== undefined; // ✅ 수정된 행인지 체크
        const showActionColumn = isCellEditable && Object.keys(reducer.state.editedRows).length > 0;
        return (_jsxs("tr", { style: { borderBottom: "1px solid var(--color-second-hover)" }, children: [showActionColumn && (_jsx("td", { className: "nh-table-cell nh-action-cell", children: isRowEdited && (_jsxs(_Fragment, { children: [_jsx("button", { className: "nh-btn nh-btn-apply", onClick: () => reducer.applyRowChanges(rowKey), children: _jsx(FaCheck, {}) }), _jsx("button", { className: "nh-btn nh-btn-reset", onClick: () => reducer.resetRowChanges(rowKey), children: _jsx(FaUndo, {}) })] })) })), showRowCheckboxCol ? (_jsx("td", { className: "nh-table-cell text-center", children: _jsx("input", { type: "checkbox", checked: selectedRows.has(row), onChange: () => onToggleRow(row) }) })) : null, showRowNumCol ? _jsx("td", { className: "nh-table-cell text-center", children: rowNum }) : null, columns.map((col) => {
                    var _a, _b, _c, _d, _e, _f, _g;
                    const cellKey = `${rowKey}-${col.key}`;
                    const cellValue = isEditing(col.key)
                        ? (_a = reducer.state.editingCell) === null || _a === void 0 ? void 0 : _a.value
                        : (_c = (_b = reducer.state.editedRows[rowKey]) === null || _b === void 0 ? void 0 : _b[col.key]) !== null && _c !== void 0 ? _c : (col.renderCell ? col.renderCell(row) : row[col.key]);
                    return (_jsx("td", { className: "nh-table-cell", style: {
                            paddingLeft: `${level * 16}px`,
                            fontWeight: ((_d = reducer.state.editedRows[rowKey]) === null || _d === void 0 ? void 0 : _d[col.key]) !== undefined ? "bold" : "normal",
                            color: ((_e = reducer.state.editedRows[rowKey]) === null || _e === void 0 ? void 0 : _e[col.key]) !== undefined ? "red" : "inherit",
                        }, onDoubleClick: () => isCellEditable && handleCellDoubleClick(rowKey, col.key, cellValue), children: isEditing(col.key) ? (_jsx("input", { type: "text", value: (_g = (_f = reducer.state.editingCell) === null || _f === void 0 ? void 0 : _f.value) !== null && _g !== void 0 ? _g : "", onChange: (e) => handleCellChange(e.target.value), onKeyDown: (e) => handleKeyDown(e, row), className: "nh-edit-input" })) : (cellValue) }, col.key));
                })] }, rowKey));
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
    return (_jsx(_Fragment, { children: _jsx("tbody", { style: style, children: reducer.state.data.map((row, index) => isGroupRowHelper(row)
                ? renderGroupRow(row, 0)
                : renderDataRow(row, 0, index + 1)) }) }));
};
export default GridBody;
