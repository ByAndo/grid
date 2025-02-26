import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useRef } from "react";
import { FaFilter, FaLayerGroup, FaSortAmountDown, FaSortAmountUp, FaTimes } from "react-icons/fa";
const GridContextMenu = ({ menuPosition, options, onClose, reducer, }) => {
    var _a, _b, _c, _d, _e, _f, _g;
    const menuRef = useRef(null);
    // ✅ 메뉴 위치 또는 옵션이 없으면 렌더링 안함
    if (!menuPosition || !options)
        return null;
    // ✅ 컨텍스트 메뉴 항목 정의
    const menuItems = [
        // 🔹 정렬 관련 옵션
        options.sortable && {
            label: ((_a = options.contextMenuLabels) === null || _a === void 0 ? void 0 : _a.sortAsc) || "오름차순 정렬",
            icon: _jsx(FaSortAmountUp, { className: "text-blue-600 text-sm" }),
            onClick: () => reducer === null || reducer === void 0 ? void 0 : reducer.setSort(menuPosition.column, "asc"),
        },
        options.sortable && {
            label: ((_b = options.contextMenuLabels) === null || _b === void 0 ? void 0 : _b.sortDesc) || "내림차순 정렬",
            icon: _jsx(FaSortAmountDown, { className: "text-blue-600 text-sm" }),
            onClick: () => reducer === null || reducer === void 0 ? void 0 : reducer.setSort(menuPosition.column, "desc"),
        },
        options.sortable && {
            label: ((_c = options.contextMenuLabels) === null || _c === void 0 ? void 0 : _c.clearSort) || "정렬 해제",
            icon: _jsx(FaTimes, { className: "text-red-600 text-sm" }),
            onClick: () => reducer === null || reducer === void 0 ? void 0 : reducer.setSort(menuPosition.column, null),
        },
        // 🔹 구분선 추가 (정렬 & 그룹/필터 옵션 구분)
        options.sortable && (options.grouping || options.filterable) && { divider: true },
        // 🔹 그룹화 관련 옵션
        options.grouping && {
            label: ((_d = options.contextMenuLabels) === null || _d === void 0 ? void 0 : _d.group) || "그룹화",
            icon: _jsx(FaLayerGroup, { className: "text-green-600 text-sm" }),
            onClick: () => reducer === null || reducer === void 0 ? void 0 : reducer.setGroup(menuPosition.column),
        },
        options.grouping && {
            label: ((_e = options.contextMenuLabels) === null || _e === void 0 ? void 0 : _e.ungroup) || "그룹 해제",
            icon: _jsx(FaTimes, { className: "text-red-600 text-sm" }),
            onClick: () => reducer === null || reducer === void 0 ? void 0 : reducer.removeGroup(menuPosition.column),
        },
        // 🔹 구분선 추가 (그룹 & 필터 옵션 구분)
        options.grouping && options.filterable && { divider: true },
        // 🔹 필터 관련 옵션
        options.filterable && {
            label: ((_f = options.contextMenuLabels) === null || _f === void 0 ? void 0 : _f.filter) || "필터",
            icon: _jsx(FaFilter, { className: "text-amber-500 text-sm" }),
            onClick: () => reducer === null || reducer === void 0 ? void 0 : reducer.setFilter({ [menuPosition.column]: "" }),
        },
        options.filterable && {
            label: ((_g = options.contextMenuLabels) === null || _g === void 0 ? void 0 : _g.clearFilter) || "필터 해제",
            icon: _jsx(FaTimes, { className: "text-red-600 text-sm" }),
            onClick: () => reducer === null || reducer === void 0 ? void 0 : reducer.clearFilter(menuPosition.column),
        },
    ].filter(Boolean); // ✅ `undefined` 제거
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                onClose();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [onClose]);
    return (_jsx(_Fragment, { children: _jsx("div", { ref: menuRef, className: "fixed z-[9999] w-48 border rounded-md border-[var(--color-second)] shadow-lg bg-[var(--color-prime)] text-[var(--color-font)]", style: {
                top: `${menuPosition.y}px`,
                left: `${menuPosition.x}px`,
                transform: "translate(0, 5px)",
            }, children: _jsx("ul", { className: "text-sm", children: menuItems.map((item, index) => item.divider ? (_jsx("hr", { className: "border-t-[var(--color-second)] my-1" }, `divider-${index}`)) : (_jsxs("li", { className: `flex items-center gap-2 px-3 py-1.5 ${item.disabled
                        ? "opacity-50 cursor-not-allowed" // ✅ 비활성화 스타일 적용
                        : "hover:bg-[var(--color-prime-hover)] cursor-pointer"}`, onClick: () => {
                        if (!item.disabled && item.onClick)
                            item.onClick(); // ✅ 클릭 방지 처리
                        onClose();
                    }, children: [item.icon && _jsx("span", { className: "w-5 h-5 flex items-center", children: item.icon }), " ", _jsx("span", { children: item.label })] }, index))) }) }) }));
};
export default GridContextMenu;
