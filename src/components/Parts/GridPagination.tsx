import React, { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // 🔹 아이콘 추가

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    totalDataCount: number;    
    pageSize: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (size: number) => void;
}

const GridPagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    totalDataCount, 
    pageSize,  
    onPageChange,
    onPageSizeChange
}) => {
    const pageSizes = [10, 20, 30, 50, 100];   
    const [isOpen, setIsOpen] = useState(false);  
    const dropdownRef = useRef<HTMLDivElement>(null); 
    
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
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

    return (
        <div 
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "8px 16px",
                borderTop: "1px solid var(--color-font)",
                backgroundColor: "var(--color-second)"
            }}
        >
            {/* 🔹 총 데이터 개수 & 현재 페이지 정보 */}
            <span style={{ fontSize: "14px", color: "var(--color-font)" }}>
                Total <b>{totalDataCount}</b> page | Page {currentPage} / {totalPages}
            </span>
        
            {/* 🔹 페이지 크기 선택 */}
            <div className="nh-dropdown-container">
                <span className="nh-dropdown-label">Page Size:</span>
                <div className="nh-dropdown-wrapper" ref={dropdownRef}>
                    <button 
                        onClick={(e) => {
                            e.stopPropagation(); // ✅ 드롭다운 내부 클릭 시 닫히지 않도록 수정
                            setIsOpen(!isOpen);
                        }} 
                        className="nh-dropdown-button"
                    >
                        {pageSize}
                    </button>
                    {isOpen && (                
                        <div className="nh-dropdown-menu">
                            {pageSizes.map((size, index) => (
                                <div
                                    key={index}
                                    onClick={() => {
                                        onPageSizeChange(size);
                                        setIsOpen(false);
                                    }}
                                    className="nh-dropdown-item"
                                >         
                                    {size}
                                </div>
                            ))}
                        </div>
                    )}                    
                </div>            
            </div>
        
            {/* 🔹 페이지네이션 버튼 */}
            <div style={{ display: "flex", gap: "4px" }}>
            <button 
                className="nh-button" 
                onClick={() => currentPage > 1 && onPageChange(currentPage - 1)} 
                disabled={currentPage === 1} 
            >
                    <FaChevronLeft size={14} />
                </button>                             
        
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button      
                        key={page}
                        className={`nh-button ${page === currentPage ? "nh-button-active" : ""}`}  
                        onClick={() => onPageChange(page)}
                    >
                        {page}  
                    </button>                      
                ))}
        
        <button 
            className="nh-button" 
            onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)} 
            disabled={currentPage === totalPages} 
        >
                    <FaChevronRight size={14} />
                </button>                   
            </div>
        </div>
    );
};

export default GridPagination;
