import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef } from "react";
import { FaFilter, FaLayerGroup, FaSortAmountDown, FaSortAmountUp, FaTimes } from "react-icons/fa";
const GridContextMenu = ({ menuPosition, options, onClose, reducer, }) => {
    var _a, _b, _c, _d, _e, _f, _g;
    const menuRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                onClose();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [onClose]);
    if (!menuPosition || !options)
        return null;
    const menuItems = [
        options.sortable && menuPosition.column.sortable && {
            label: ((_a = options.contextMenuLabels) === null || _a === void 0 ? void 0 : _a.sortAsc) || "오름차순 정렬",
            icon: _jsx(FaSortAmountUp, { style: { color: "#2563EB", fontSize: "14px" } }), // ✅ text-blue-600
            onClick: () => reducer === null || reducer === void 0 ? void 0 : reducer.setSort(menuPosition.column.key, "asc"),
        },
        options.sortable && menuPosition.column.sortable && {
            label: ((_b = options.contextMenuLabels) === null || _b === void 0 ? void 0 : _b.sortDesc) || "내림차순 정렬",
            icon: _jsx(FaSortAmountDown, { style: { color: "#2563EB", fontSize: "14px" } }), // ✅ text-blue-600
            onClick: () => reducer === null || reducer === void 0 ? void 0 : reducer.setSort(menuPosition.column.key, "desc"),
        },
        options.sortable && menuPosition.column.sortable && {
            label: ((_c = options.contextMenuLabels) === null || _c === void 0 ? void 0 : _c.clearSort) || "정렬 해제",
            icon: _jsx(FaTimes, { style: { color: "#DC2626", fontSize: "14px" } }), // ✅ text-red-600
            onClick: () => reducer === null || reducer === void 0 ? void 0 : reducer.setSort(menuPosition.column.key, null),
        },
        options.sortable && menuPosition.column.sortable && (options.grouping || options.filterable) && { divider: true },
        options.grouping && {
            label: ((_d = options.contextMenuLabels) === null || _d === void 0 ? void 0 : _d.group) || "그룹화",
            icon: _jsx(FaLayerGroup, { style: { color: "#16A34A", fontSize: "14px" } }), // ✅ text-green-600
            onClick: () => reducer === null || reducer === void 0 ? void 0 : reducer.setGroup(menuPosition.column.key),
        },
        options.grouping && {
            label: ((_e = options.contextMenuLabels) === null || _e === void 0 ? void 0 : _e.ungroup) || "그룹 해제",
            icon: _jsx(FaTimes, { style: { color: "#DC2626", fontSize: "14px" } }), // ✅ text-red-600
            onClick: () => reducer === null || reducer === void 0 ? void 0 : reducer.removeGroup(menuPosition.column.key),
        },
        (options.grouping || options.sortable) && options.filterable && menuPosition.column.filterable && { divider: true },
        options.filterable && menuPosition.column.filterable && {
            label: ((_f = options.contextMenuLabels) === null || _f === void 0 ? void 0 : _f.filter) || "필터",
            icon: _jsx(FaFilter, { style: { color: "#D97706", fontSize: "14px" } }), // ✅ text-amber-500
            onClick: () => reducer === null || reducer === void 0 ? void 0 : reducer.setFilter({ [menuPosition.column.key]: "" }),
        },
        options.filterable && menuPosition.column.filterable && {
            label: ((_g = options.contextMenuLabels) === null || _g === void 0 ? void 0 : _g.clearFilter) || "필터 해제",
            icon: _jsx(FaTimes, { style: { color: "#DC2626", fontSize: "14px" } }), // ✅ text-red-600
            onClick: () => reducer === null || reducer === void 0 ? void 0 : reducer.clearFilter(menuPosition.column.key),
        },
    ].filter(Boolean);
    return (_jsx("div", { ref: menuRef, className: "nh-context-menu", style: {
            top: `${menuPosition.y}px`,
            left: `${menuPosition.x}px`,
        }, children: _jsx("ul", { className: "nh-context-menu-list", children: menuItems.map((item, index) => item.divider ? (_jsx("hr", { className: "nh-context-divider" }, `divider-${index}`)) : (_jsxs("li", { className: `nh-context-item ${item.disabled ? "nh-context-disabled" : ""}`, onClick: () => {
                    if (!item.disabled && item.onClick)
                        item.onClick();
                    onClose();
                }, children: [item.icon && _jsx("span", { className: "nh-context-icon", children: item.icon }), _jsx("span", { children: item.label })] }, index))) }) }));
};
export default GridContextMenu;
