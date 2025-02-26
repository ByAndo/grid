import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React from "react";
import { isGroupRowHelper } from "../Utility/GridUtility";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
const GridBody = ({ gridState, columns, showRowNumCol = false, showRowCheckboxCol = false, selectedRows, onToggleRow, onToggleGroupExpand, }) => {
    /** 🔹 그룹 Row 렌더링 (재귀 호출) */
    const renderGroupRow = (row, level) => {
        const groupKey = row.__groupKey;
        const isExpanded = gridState.group.expanded.has(groupKey);
        let localRowIndex = 0; // ✅ 그룹 내부 Row Num 관리
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
    const renderDataRow = (row, level, rowNum) => (_jsxs("tr", { style: { borderBottom: "1px solid var(--color-second-hover)" }, children: [showRowNumCol ? _jsx("td", { className: "nh-table-cell", style: { textAlign: "center" }, children: rowNum }) : null, showRowCheckboxCol ? (_jsx("td", { className: "nh-table-cell", style: { textAlign: "center" }, children: _jsx("input", { type: "checkbox", checked: selectedRows.has(row), onChange: () => onToggleRow(row), style: { cursor: "pointer" } }) })) : null, columns.map((col) => {
                const cellValue = col.renderCell ? col.renderCell(row) : row[col.key];
                return (_jsx("td", { className: "nh-table-cell", style: { paddingLeft: `${level * 16}px` }, children: typeof cellValue === "object" && cellValue !== null ? JSON.stringify(cellValue) : String(cellValue !== null && cellValue !== void 0 ? cellValue : "") }, String(col.key)));
            })] }, JSON.stringify(row)));
    return (_jsx(_Fragment, { children: _jsx("tbody", { children: gridState.data.map((row, index) => isGroupRowHelper(row)
                ? renderGroupRow(row, 0)
                : renderDataRow(row, 0, index + 1)) }) }));
};
export default GridBody;
