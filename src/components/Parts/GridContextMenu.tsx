import { useEffect, useRef } from "react";
import { ContextMenuItem, GridOptions } from "../GridTypes";
import { GridReducerReturn } from "../Reducer/useGridReducer";
import { FaFilter, FaLayerGroup, FaSortAmountDown, FaSortAmountUp, FaTimes } from "react-icons/fa";

interface GridContextMenuProps<T> {
    menuPosition: { x: number; y: number; column: string } | null;
    options?: GridOptions;
    onClose: () => void;
    reducer?: GridReducerReturn<T>;
}

const GridContextMenu = <T,>({
    menuPosition,
    options,
    onClose,
    reducer,
}: GridContextMenuProps<T>) => {
    
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

    // ✅ 메뉴 위치 또는 옵션이 없으면 렌더링 안함
    if (!menuPosition || !options) return null;

    // ✅ 컨텍스트 메뉴 항목 정의
    const menuItems: ContextMenuItem[] = [
        // 🔹 정렬 관련 옵션 
        options.sortable && {
            label: options.contextMenuLabels?.sortAsc || "오름차순 정렬",
            icon: <FaSortAmountUp className="text-blue-600 text-sm" />,
            onClick: () => reducer?.setSort(menuPosition.column, "asc"),
        },
        options.sortable && {
            label: options.contextMenuLabels?.sortDesc || "내림차순 정렬",
            icon: <FaSortAmountDown className="text-blue-600 text-sm" />,
            onClick: () => reducer?.setSort(menuPosition.column, "desc"),
        },
        options.sortable && {
            label: options.contextMenuLabels?.clearSort || "정렬 해제",
            icon: <FaTimes className="text-red-600 text-sm" />,
            onClick: () => reducer?.setSort(menuPosition.column, null),
        },

        // 🔹 구분선 추가 (정렬 & 그룹/필터 옵션 구분)
        options.sortable && (options.grouping || options.filterable) && { divider: true },

        // 🔹 그룹화 관련 옵션
        options.grouping && {
            label: options.contextMenuLabels?.group || "그룹화",
            icon: <FaLayerGroup className="text-green-600 text-sm" />,
            onClick: () => reducer?.setGroup(menuPosition.column),
        },
        options.grouping && {
            label: options.contextMenuLabels?.ungroup || "그룹 해제",
            icon: <FaTimes className="text-red-600 text-sm" />,
            onClick: () => reducer?.removeGroup(menuPosition.column),
        },

        // 🔹 구분선 추가 (그룹 & 필터 옵션 구분)
        options.grouping && options.filterable && { divider: true },

        // 🔹 필터 관련 옵션
        options.filterable && {
            label: options.contextMenuLabels?.filter || "필터",
            icon: <FaFilter className="text-amber-500 text-sm" />,
            onClick: () => reducer?.setFilter({ [menuPosition.column]: "" }),
        },
        options.filterable && {
            label: options.contextMenuLabels?.clearFilter || "필터 해제",
            icon: <FaTimes className="text-red-600 text-sm" />,
            onClick: () => reducer?.clearFilter(menuPosition.column),
        },
    ].filter(Boolean) as ContextMenuItem[]; // ✅ `undefined` 제거




    return (
        <>
            <div
                ref={menuRef}
                className="fixed z-[9999] w-48 border rounded-md border-[var(--color-second)] shadow-lg bg-[var(--color-prime)] text-[var(--color-font)]"
                style={{
                    top: `${menuPosition.y}px`,
                    left: `${menuPosition.x}px`,
                    transform: "translate(0, 5px)",
                }}
            >
                <ul className="text-sm">
                    {menuItems.map((item, index) =>
                    item.divider ? (
                        <hr key={`divider-${index}`} className="border-t-[var(--color-second)] my-1" />
                    ) : (
                        <li
                        key={index}
                        className={`flex items-center gap-2 px-3 py-1.5 ${
                            item.disabled
                            ? "opacity-50 cursor-not-allowed" // ✅ 비활성화 스타일 적용
                            : "hover:bg-[var(--color-prime-hover)] cursor-pointer"
                        }`}
                        onClick={() => {
                            if (!item.disabled && item.onClick) item.onClick(); // ✅ 클릭 방지 처리
                            onClose();
                        }}
                        >
                        {item.icon && <span className="w-5 h-5 flex items-center">{item.icon}</span>} {/* ✅ 아이콘 추가 */}
                        <span>{item.label}</span>
                        </li>
                    )
                    )}
                </ul>
            </div>        

        </>
    );
};

export default GridContextMenu;
