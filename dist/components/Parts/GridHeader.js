import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FaLayerGroup, FaFilter, FaSortAmountUp, FaSortAmountDown } from "react-icons/fa";
import { useState } from "react";
import GridContextMenu from "./GridContextMenu";
const GridHeader = ({ columns, showRowNumCol, showRowCheckboxCol, options, reducer }) => {
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
    return (_jsxs("thead", { className: "bg-[var(--color-prime)] text-[var(--color-font)]", children: [_jsxs("tr", { className: "bg-[var(--color-second)] text-[var(--color-font)] border-b-[2px] border-[var(--color-font)]", children: [showRowNumCol && _jsx("th", { className: "table-th", children: "No." }), showRowCheckboxCol && _jsx("th", { className: "table-th", children: "\u2714" }), columns.map((col) => {
                        var _a;
                        return (_jsx("th", { className: `table-th relative ${col.className ? col.className : ""} ${col.sticky === "left" ? "sticky left-0 bg-[var(--color-prime)]" : ""} ${col.sticky === "right" ? "sticky right-0 bg-[var(--color-prime)]" : ""}`, style: {
                                width: col.width ? `${col.width}px` : "auto",
                                textAlign: col.align || "left"
                            }, title: col.tooltip, onContextMenu: (event) => handleContextMenu(event, col.key), children: _jsxs("div", { className: "flex items-center space-x-2 cursor-pointer", children: [_jsx("span", { children: col.label }), col.sortable && sortedColumn === col.key && sortDirection !== null && (sortDirection === "asc" ?
                                        _jsx(FaSortAmountUp, { className: "text-blue-600 text-sm" })
                                        : _jsx(FaSortAmountDown, { className: "text-blue-600 text-sm" })), ((_a = group.column) === null || _a === void 0 ? void 0 : _a.includes(col.key)) && _jsx(FaLayerGroup, { className: "text-green-600 text-sm" }), (options === null || options === void 0 ? void 0 : options.filterable) && filters[col.key] !== undefined && _jsx(FaFilter, { className: "text-amber-500 text-sm" })] }) }, col.key));
                    })] }), columns.some(col => (options === null || options === void 0 ? void 0 : options.filterable) && filters[col.key] !== undefined)
                ? (_jsxs("tr", { className: "bg-[var(--color-prime-hover)] border-b border-[var(--color-font)]", children: [showRowNumCol ? _jsx("td", { className: "p-2", children: "\u00A0" }) : null, showRowCheckboxCol ? _jsx("td", { className: "p-2", children: "\u00A0" }) : null, columns.map((col) => (_jsx("td", { className: "p-2", children: col.filterable && filters[col.key] !== undefined && (_jsx("input", { type: "text", value: filters[col.key] || "", onChange: (e) => reducer.setFilter(Object.assign(Object.assign({}, filters), { [col.key]: e.target.value })), className: "w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary w-full p-1 border border-[var(--color-second)] bg-white text-black bg-[--color-second]", placeholder: "\uD544\uD130 \uC785\uB825..." })) }, col.key)))] })) : null, options &&
                _jsx(GridContextMenu, { menuPosition: menuPosition, options: options, onClose: closeContextMenu, reducer: reducer })] }));
};
export default GridHeader;
