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
    return (_jsxs("div", { style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "8px 16px",
            borderTop: "1px solid var(--color-font)",
            backgroundColor: "var(--color-second)"
        }, children: [_jsxs("span", { style: { fontSize: "14px", color: "var(--color-font)" }, children: ["Total ", _jsx("b", { children: totalDataCount }), " page | Page ", currentPage, " / ", totalPages] }), _jsxs("div", { className: "nh-dropdown-container", children: [_jsx("span", { className: "nh-dropdown-label", children: "Page Size:" }), _jsxs("div", { className: "nh-dropdown-wrapper", ref: dropdownRef, children: [_jsx("button", { onClick: (e) => {
                                    e.stopPropagation(); // ✅ 드롭다운 내부 클릭 시 닫히지 않도록 수정
                                    setIsOpen(!isOpen);
                                }, className: "nh-dropdown-button", children: pageSize }), isOpen && (_jsx("div", { className: "nh-dropdown-menu", children: pageSizes.map((size, index) => (_jsx("div", { onClick: () => {
                                        onPageSizeChange(size);
                                        setIsOpen(false);
                                    }, className: "nh-dropdown-item", children: size }, index))) }))] })] }), _jsxs("div", { style: { display: "flex", gap: "4px" }, children: [_jsx("button", { className: "nh-button", onClick: () => currentPage > 1 && onPageChange(currentPage - 1), disabled: currentPage === 1, children: _jsx(FaChevronLeft, { size: 14 }) }), Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (_jsx("button", { className: `nh-button ${page === currentPage ? "nh-button-active" : ""}`, onClick: () => onPageChange(page), children: page }, page))), _jsx("button", { className: "nh-button", onClick: () => currentPage < totalPages && onPageChange(currentPage + 1), disabled: currentPage === totalPages, children: _jsx(FaChevronRight, { size: 14 }) })] })] }));
};
export default GridPagination;
