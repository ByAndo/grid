import { useEffect, useRef } from "react";
import { ContextMenuItem, GridColumn, GridOptions } from "../GridTypes";
import { GridReducerReturn } from "../Reducer/useGridReducer";
import { FaFilter, FaLayerGroup, FaSortAmountDown, FaSortAmountUp, FaTimes } from "react-icons/fa";

const GridContextMenu = <T,>({    
    menuPosition,
    options,
    onClose,
    reducer,
}: {
    menuPosition: { x: number; y: number; column: GridColumn<T> } | null;
    options?: GridOptions;
    onClose: () => void;
    reducer?: GridReducerReturn<T>;
}) => {
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [onClose]);

    if (!menuPosition || !options) return null;

    const menuItems: ContextMenuItem[] = [
        options.sortable && menuPosition.column.sortable && {
            label: options.contextMenuLabels?.sortAsc || "오름차순 정렬",
            icon: <FaSortAmountUp style={{ color: "#2563EB", fontSize: "14px" }} />, // ✅ text-blue-600
            onClick: () => reducer?.setSort(menuPosition.column.key, "asc"),
        },
        options.sortable && menuPosition.column.sortable && {
            label: options.contextMenuLabels?.sortDesc || "내림차순 정렬",
            icon: <FaSortAmountDown style={{ color: "#2563EB", fontSize: "14px" }} />, // ✅ text-blue-600
            onClick: () => reducer?.setSort(menuPosition.column.key, "desc"),
        },
        options.sortable && menuPosition.column.sortable && {
            label: options.contextMenuLabels?.clearSort || "정렬 해제",
            icon: <FaTimes style={{ color: "#DC2626", fontSize: "14px" }} />, // ✅ text-red-600
            onClick: () => reducer?.setSort(menuPosition.column.key, null),
        },
        options.sortable && menuPosition.column.sortable && (options.grouping || options.filterable) && { divider: true },

        options.grouping && {
            label: options.contextMenuLabels?.group || "그룹화",
            icon: <FaLayerGroup style={{ color: "#16A34A", fontSize: "14px" }} />, // ✅ text-green-600
            onClick: () => reducer?.setGroup(menuPosition.column.key),
        },
        options.grouping && {
            label: options.contextMenuLabels?.ungroup || "그룹 해제",
            icon: <FaTimes style={{ color: "#DC2626", fontSize: "14px" }} />, // ✅ text-red-600
            onClick: () => reducer?.removeGroup(menuPosition.column.key),
        },
        (options.grouping || options.sortable) && options.filterable && menuPosition.column.filterable &&  { divider: true },

        options.filterable && menuPosition.column.filterable &&{
            label: options.contextMenuLabels?.filter || "필터",
            icon: <FaFilter style={{ color: "#D97706", fontSize: "14px" }} />, // ✅ text-amber-500
            onClick: () => reducer?.setFilter({ [menuPosition.column.key]: "" }),
        },
        options.filterable && menuPosition.column.filterable && {
            label: options.contextMenuLabels?.clearFilter || "필터 해제",
            icon: <FaTimes style={{ color: "#DC2626", fontSize: "14px" }} />, // ✅ text-red-600
            onClick: () => reducer?.clearFilter(menuPosition.column.key),
        },
    ].filter(Boolean) as ContextMenuItem[];
    

    return (
        <div
            ref={menuRef}
            className="nh-context-menu"
            style={{
                top: `${menuPosition.y}px`,
                left: `${menuPosition.x}px`,
            }}
        >
            <ul className="nh-context-menu-list">
                {menuItems.map((item, index) =>
                    item.divider ? (
                        <hr key={`divider-${index}`} className="nh-context-divider" />
                    ) : (
                        <li
                            key={index}
                            className={`nh-context-item ${item.disabled ? "nh-context-disabled" : ""}`}
                            onClick={() => {
                                if (!item.disabled && item.onClick) item.onClick();
                                onClose();
                            }}
                        >
                            {item.icon && <span className="nh-context-icon">{item.icon}</span>}
                            <span>{item.label}</span>
                        </li>
                    )
                )}
            </ul>
        </div>
    );
};

export default GridContextMenu;
