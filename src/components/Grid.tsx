import GridHeader from "./Parts/GridHeader";
import GridBody from "./Parts/GridBody";
import { useGridReducer } from "./Reducer/useGridReducer";
import GridPagination from "./Parts/GridPagination";
import { GridProps } from "./GridTypes";

const Grid = <T,>({
  columns,
  data,
  options,
  showRowNumCol = true,
  showRowCheckboxCol = false,
  pagingable = false,
  pagination,

}: GridProps<T>) => {  
  const reducer = useGridReducer<T>(data, pagingable, pagination?.pageSize);

  const { pagenate } = reducer.state;
  const totalRows = data.length; // ✅ 전체 데이터 개수
  const totalPages = Math.ceil(totalRows / pagenate.pageSize); // ✅ 총 페이지 계산
  
  
  return (
    <div className="relative w-full flex flex-col">
        <table className="w-full border-collapse">          
            <GridHeader
                columns={columns}                                
                showRowNumCol={showRowNumCol}
                showRowCheckboxCol={showRowCheckboxCol}  
                options={options}       
                reducer={reducer}       
            />
            <GridBody
                gridState={reducer.state}                            
                columns={columns}
                showRowNumCol={showRowNumCol}
                showRowCheckboxCol={showRowCheckboxCol}
                selectedRows={reducer.state.selectedRows}
                onToggleRow={reducer.toggleRow}
                onToggleGroupExpand={reducer.expandGroup}
            />          
        </table>
        {/* ✅ 페이지네이션 추가 */}
        {pagingable && (
            <GridPagination
                  currentPage={pagenate.currentPage}
                  totalPages={totalPages}
                  onPageChange={reducer.setPage} 
                  totalDataCount={data.length} 
                  pageSize={reducer.state.pagenate.pageSize} 
                  onPageSizeChange={reducer.setPageSize}            />
        )}          
    </div>
  );
};

export default Grid;

