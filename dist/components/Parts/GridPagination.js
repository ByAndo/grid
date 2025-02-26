import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // 🔹 아이콘 추가
const GridPagination = ({ currentPage, totalPages, totalDataCount, pageSize, onPageChange, onPageSizeChange }) => {
    const pageSizes = [10, 20, 30, 50, 100];
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        if (isOpen) {
            window.addEventListener("click", handleClickOutside);
        }
        return () => {
            window.removeEventListener("click", handleClickOutside);
        };
    }, [isOpen]);
    return (_jsxs("div", { className: "flex items-center justify-between px-4 py-2 border-t border-[var(--color-font)] bg-[var(--color-second)]", children: [_jsxs("span", { className: "text-sm text-[var(--color-font)]", children: ["Total ", _jsx("b", { children: totalDataCount }), " page | Page ", currentPage, " / ", totalPages] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("span", { className: "text-sm", children: "Page Size:" }), _jsxs("div", { className: "relative", ref: dropdownRef, children: [_jsx("button", { onClick: () => setIsOpen(!isOpen), className: "flex items-center gap-2 p-1 h-6 text-sm rounded-md bg-[var(--color-prime)] text-[var(--color-font)] w-16", children: pageSize }), isOpen && (_jsx("div", { className: "absolute left-0 mt-1 w-36 border rounded-md border-[var(--color-second)] shadow-lg bg-[var(--color-prime)] text-[var(--color-font)]", children: pageSizes.map((size, index) => (_jsx("div", { onClick: () => {
                                        onPageSizeChange(size);
                                        setIsOpen(false);
                                    }, className: "flex items-center gap-2 px-3 py-1.5 hover:bg-[var(--color-prime-hover)] cursor-pointer", children: size }, index))) }))] })] }), _jsxs("div", { className: "flex space-x-1", children: [_jsx("button", { className: "flex items-center justify-center gap-1 px-2 py-1 text-[13px] \r\n                        font-semibold rounded transition\r\n                        disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer", style: {
                            background: "var(--color-second-hover)",
                            color: "var(--color-font)"
                        }, onMouseEnter: (e) => e.currentTarget.style.background = "var(--color-second-hover)", onMouseLeave: (e) => e.currentTarget.style.background = "var(--color-second)", children: _jsx(FaChevronLeft, { size: 14 }) }), Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (_jsx("button", { className: "flex items-center justify-center gap-1 px-2 py-1 text-[13px] \r\n                            font-semibold rounded transition\r\n                            disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer", style: {
                            background: (page === currentPage ? "var(--color-active)" : "var(--color-second)"),
                            color: "var(--color-font)"
                        }, onClick: () => onPageChange(page), onMouseEnter: (e) => e.currentTarget.style.background = "var(--color-second-hover)", onMouseLeave: (e) => e.currentTarget.style.background = (page === currentPage ? "var(--color-active)" : "var(--color-second)"), children: page }, page))), _jsx("button", { className: "flex items-center justify-center gap-1 px-2 py-1 text-[13px] \r\n                        font-semibold rounded transition\r\n                        disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer", style: {
                            background: "var(--color-second-hover)",
                            color: "var(--color-font)"
                        }, onMouseEnter: (e) => e.currentTarget.style.background = "var(--color-second-hover)", onMouseLeave: (e) => e.currentTarget.style.background = "var(--color-second)", children: _jsx(FaChevronRight, { size: 14 }) })] })] }));
};
export default GridPagination;
