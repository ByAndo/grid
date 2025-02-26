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
        <div className="flex items-center justify-between px-4 py-2 border-t border-[var(--color-font)] bg-[var(--color-second)]">
            {/* 🔹 총 데이터 개수 & 현재 페이지 정보 */}
            <span className="text-sm text-[var(--color-font)]">
                Total <b>{totalDataCount}</b> page | Page {currentPage} / {totalPages}
            </span>

            {/* 🔹 페이지 크기 선택 (pageSize 변경) */}
            <div className="flex items-center space-x-2">
                <span className="text-sm">Page Size:</span>
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex items-center gap-2 p-1 h-6 text-sm rounded-md bg-[var(--color-prime)] text-[var(--color-font)] w-16"
                    >
                        {pageSize}
                    </button>
                    {isOpen && (                
                        <div className="absolute left-0 mt-1 w-36 border rounded-md border-[var(--color-second)] shadow-lg bg-[var(--color-prime)] text-[var(--color-font)]">
                            {pageSizes.map((size, index) => (
                                <div
                                    key={index}
                                    onClick={() => {
                                        onPageSizeChange(size)
                                        setIsOpen(false);
                                    }}
                                    className="flex items-center gap-2 px-3 py-1.5 hover:bg-[var(--color-prime-hover)] cursor-pointer"
                                >         
                                    {size}
                                </div>
                            ))}
                        </div>
                    )}                    
                </div>            
            </div>

            {/* 🔹 페이지네이션 버튼 */}
            <div className="flex space-x-1">
                <button      
                    className="flex items-center justify-center gap-1 px-2 py-1 text-[13px] 
                        font-semibold rounded transition
                        disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        style={{
                            background : "var(--color-second-hover)",    
                            color : "var(--color-second)"                          
                        }}        
                        onMouseEnter={(e)=> e.currentTarget.style.background = "var(--color-second)"}
                        onMouseLeave={(e)=> e.currentTarget.style.background = "var(--color-second-hover)"}                                                    
                >
                    <FaChevronLeft size={14} />   
                </button>                             

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button      
                        key = {page}
                        className="flex items-center justify-center gap-1 px-2 py-1 text-[13px] 
                            font-semibold rounded transition
                            disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                            style={{
                                background :(page === currentPage ? "var(--color-active)" : "var(--color-second)"),    
                                color : "var(--color-second)"                          
                            }}        
                            onClick={() => onPageChange(page)}
                            onMouseEnter={(e)=> e.currentTarget.style.background = "var(--color-second)"}
                            onMouseLeave={(e)=> e.currentTarget.style.background = "var(--color-second-hover)"}                                                    
                    >
                        {page}  
                    </button>                      
                ))}
                <button      
                    className="flex items-center justify-center gap-1 px-2 py-1 text-[13px] 
                        font-semibold rounded transition
                        disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        style={{
                            background : "var(--color-second-hover)",    
                            color : "var(--color-second)"                          
                        }}        
                        onMouseEnter={(e)=> e.currentTarget.style.background = "var(--color-second)"}
                        onMouseLeave={(e)=> e.currentTarget.style.background = "var(--color-second-hover)"}                                                    
                >
                    <FaChevronRight size={14} />   
                </button>                   
            </div>
        </div>
    );
};

export default GridPagination;
