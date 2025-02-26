import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import GridHeader from "./Parts/GridHeader";
import GridBody from "./Parts/GridBody";
import { useGridReducer } from "./Reducer/useGridReducer";
import GridPagination from "./Parts/GridPagination";
const Grid = ({ columns, data, options, showRowNumCol = true, showRowCheckboxCol = false, pagingable = false, pagination, }) => {
    const reducer = useGridReducer(data, pagingable, pagination === null || pagination === void 0 ? void 0 : pagination.pageSize);
    const { pagenate } = reducer.state;
    const totalRows = data.length; // ✅ 전체 데이터 개수
    const totalPages = Math.ceil(totalRows / pagenate.pageSize); // ✅ 총 페이지 계산
    return (_jsxs("div", { className: "relative w-full flex flex-col", children: [_jsxs("table", { className: "w-full border-collapse", children: [_jsx(GridHeader, { columns: columns, showRowNumCol: showRowNumCol, showRowCheckboxCol: showRowCheckboxCol, options: options, reducer: reducer }), _jsx(GridBody, { gridState: reducer.state, columns: columns, showRowNumCol: showRowNumCol, showRowCheckboxCol: showRowCheckboxCol, selectedRows: reducer.state.selectedRows, onToggleRow: reducer.toggleRow, onToggleGroupExpand: reducer.expandGroup })] }), pagingable && (_jsx(GridPagination, { currentPage: pagenate.currentPage, totalPages: totalPages, onPageChange: reducer.setPage, totalDataCount: data.length, pageSize: reducer.state.pagenate.pageSize, onPageSizeChange: reducer.setPageSize }))] }));
};
export default Grid;
