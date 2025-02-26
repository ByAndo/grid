import React from "react";
interface PaginationProps {
    currentPage: number;
    totalPages: number;
    totalDataCount: number;
    pageSize: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (size: number) => void;
}
declare const GridPagination: React.FC<PaginationProps>;
export default GridPagination;
