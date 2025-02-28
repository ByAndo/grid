import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FaLayerGroup, FaFilter, FaSortAmountUp, FaSortAmountDown, FaCheck, FaUndo } from "react-icons/fa";
import { useState } from "react";
import GridContextMenu from "./GridContextMenu";
const GridHeader = ({ columns, showRowNumCol, showRowCheckboxCol, options, reducer, editedRows, style, }) => {
    const [menuPosition, setmenuPosition] = useState(null);
    const { filters, sortedColumn, sortDirection, group } = reducer.state;
    // ✅ 우클릭 이벤트 핸들러
    const handleContextMenu = (event, column) => {
        event.preventDefault();
        if (options) {
            setmenuPosition({ x: event.clientX, y: event.clientY, column });
        }
    };
    // ✅ 메뉴 닫기 함수
    const closeContextMenu = () => setmenuPosition(null);
    console.log(editedRows);
    return (_jsxs("thead", { className: "nh-grid-header", children: [_jsxs("tr", { className: "nh-grid-header-row", children: [editedRows && Object.keys(editedRows).length > 0 && (_jsx("th", { className: "nh-grid-header-cell nh-action-header", style: Object.assign({}, style), children: _jsxs("div", { style: { display: "flex", gap: "1px", justifyContent: "center" }, children: [_jsx("button", { className: "nh-btn nh-btn-apply", onClick: reducer.applyAllChanges, children: _jsx(FaCheck, {}) }), _jsx("button", { className: "nh-btn nh-btn-reset", onClick: reducer.resetAllChanges, children: _jsx(FaUndo, {}) })] }) })), showRowCheckboxCol && _jsx("th", { className: "nh-grid-header-cell", style: Object.assign({}, style), children: "\u2714" }), showRowNumCol && _jsx("th", { className: "nh-grid-header-cell", style: Object.assign({}, style), children: "No." }), columns.map((col) => {
                        var _a;
                        return (_jsx("th", { className: `nh-grid-header-cell ${col.sticky === "left" ? "sticky-left" : ""} ${col.sticky === "right" ? "sticky-right" : ""}`, style: Object.assign({ width: col.width ? `${col.width}px` : "auto", textAlign: col.align || "left" }, style), title: col.tooltip, onContextMenu: (event) => handleContextMenu(event, col), children: _jsxs("div", { className: "nh-grid-header-content", children: [_jsx("span", { children: col.label }), col.sortable && sortedColumn === col.key && sortDirection !== null && (sortDirection === "asc" ?
                                        _jsx(FaSortAmountUp, { style: { color: "#2563EB", fontSize: "14px" } })
                                        : _jsx(FaSortAmountDown, { style: { color: "#2563EB", fontSize: "14px" } })), ((_a = group.column) === null || _a === void 0 ? void 0 : _a.includes(col.key)) && _jsx(FaLayerGroup, { style: { color: "#16A34A", fontSize: "14px" } }), (options === null || options === void 0 ? void 0 : options.filterable) && filters[col.key] !== undefined && _jsx(FaFilter, { style: { color: "#D97706", fontSize: "14px" } })] }) }, col.key));
                    })] }), columns.some(col => (options === null || options === void 0 ? void 0 : options.filterable) && filters[col.key] !== undefined)
                ? (_jsxs("tr", { className: "nh-grid-filter-row", children: [showRowNumCol ? _jsx("td", { style: { padding: "8px" }, children: "\u00A0" }) : null, showRowCheckboxCol ? _jsx("td", { style: { padding: "8px" }, children: "\u00A0" }) : null, columns.map((col) => (_jsx("td", { style: { padding: "8px" }, children: col.filterable && filters[col.key] !== undefined && (_jsx("input", { type: "text", value: filters[col.key] || "", onChange: (e) => reducer.setFilter(Object.assign(Object.assign({}, filters), { [col.key]: e.target.value })), className: "nh-grid-filter-input", placeholder: "\uD544\uD130 \uC785\uB825..." })) }, col.key)))] })) : null, options &&
                _jsx(GridContextMenu, { menuPosition: menuPosition, options: options, onClose: closeContextMenu, reducer: reducer })] }));
};
export default GridHeader;
