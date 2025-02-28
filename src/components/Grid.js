import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import GridHeader from "./Parts/GridHeader";
import GridBody from "./Parts/GridBody";
import { useGridReducer } from "./Reducer/useGridReducer";
import GridPagination from "./Parts/GridPagination";
import { setRowKeysForOrginData } from "./Utility/GridUtility";
import "../../index.css";
import { useEffect } from "react";
const Grid = ({ columns, data, options, showRowNumCol = true, showRowCheckboxCol = false, pagingable = false, pagination, isCellEditable = false, style, headerStyle, bodyStyle, onSelectionChange, }) => {
    const reducer = useGridReducer(setRowKeysForOrginData(data), pagingable, pagination === null || pagination === void 0 ? void 0 : pagination.pageSize);
    const { pagenate } = reducer.state;
    const totalRows = data.length; // ✅ 전체 데이터 개수
    const totalPages = Math.ceil(totalRows / pagenate.pageSize); // ✅ 총 페이지 계산  
    console.log("Grid.tsx - editedRows:", reducer.state.editedRows);
    useEffect(() => {
        if (showRowCheckboxCol && onSelectionChange) {
            onSelectionChange(reducer.state.selectedRows);
        }
    }, [showRowCheckboxCol, reducer.state.selectedRows, onSelectionChange]);
    return (_jsxs("div", { className: "nh-grid-container", style: style, children: [_jsxs("table", { className: "nh-grid-table", children: [_jsx(GridHeader, { columns: columns, showRowNumCol: showRowNumCol, showRowCheckboxCol: showRowCheckboxCol, options: options, reducer: reducer, editedRows: reducer.state.editedRows, style: headerStyle }), _jsx(GridBody, { reducer: reducer, columns: columns, isCellEditable: isCellEditable, showRowNumCol: showRowNumCol, showRowCheckboxCol: showRowCheckboxCol, selectedRows: reducer.state.selectedRows, onToggleRow: reducer.toggleRow, onToggleGroupExpand: reducer.expandGroup, style: bodyStyle })] }), pagingable && (_jsx(GridPagination, { currentPage: pagenate.currentPage, totalPages: totalPages, onPageChange: reducer.setPage, totalDataCount: data.length, pageSize: reducer.state.pagenate.pageSize, onPageSizeChange: reducer.setPageSize }))] }));
};
export default Grid;
