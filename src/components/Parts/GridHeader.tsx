import { FaLayerGroup, FaFilter, FaSortAmountUp, FaSortAmountDown } from "react-icons/fa";
import { GridColumn, GridOptions} from "../GridTypes";
import { useState } from "react";
import { GridReducerReturn } from "../Reducer/useGridReducer";
import GridContextMenu from "./GridContextMenu";

interface GridHeaderProps<T> {
  columns: GridColumn<T>[];        
  showRowNumCol?: boolean;
  showRowCheckboxCol?: boolean;
  options?: GridOptions;
  reducer : GridReducerReturn<T>
}
const GridHeader = <T,>({
    columns,            
    showRowNumCol,
    showRowCheckboxCol,
    options,
    reducer
    
  }: GridHeaderProps<T>) => {
    const [menuPosition, setmenuPosition] = useState<{ x: number; y: number, column : string } | null>(null);
    const {filters, sortedColumn, sortDirection, group} = reducer.state
    // ✅ 우클릭 이벤트 핸들러
    const handleContextMenu = (event: React.MouseEvent, column : string) => {
        event.preventDefault();
        if (options) {
            setmenuPosition({ x: event.clientX, y: event.clientY, column });
        }
    };   

    // ✅ 메뉴 닫기 함수
    const closeContextMenu = () => setmenuPosition(null); 

    return (
      <thead className="bg-[var(--color-prime)] text-[var(--color-font)]">
        <tr className="bg-[var(--color-second)] text-[var(--color-font)] border-b-[2px] border-[var(--color-font)]">  
            {/*Row Number Defualt 컬럼  */}
            {showRowNumCol && <th className="table-th">No.</th>}
            {/*Rww Check Box Defualt 컬럼  */}
            {showRowCheckboxCol && <th className="table-th">✔</th>}
    
            {columns.map((col) => (
                <th
                    key={col.key}
                    className={`table-th relative ${
                            col.className ? col.className : ""
                        } ${col.sticky === "left" ? "sticky left-0 bg-[var(--color-prime)]" : ""} ${
                            col.sticky === "right" ? "sticky right-0 bg-[var(--color-prime)]" : ""
                        }`}
                    style={{ 
                        width: col.width ? `${col.width}px` : "auto", 
                        textAlign: col.align || "left" }}
                    title={col.tooltip}
                    onContextMenu={(event)=> handleContextMenu(event, col.key)}
                >
                    <div className="flex items-center space-x-2 cursor-pointer">
                        <span>{col.label}</span>
                        {col.sortable && sortedColumn === col.key && sortDirection !== null && (
                            sortDirection === "asc" ? 
                                <FaSortAmountUp className="text-blue-600 text-sm" /> 
                                : <FaSortAmountDown className="text-blue-600 text-sm" />
                        )}
                        {group.column?.includes(col.key) && <FaLayerGroup className="text-green-600 text-sm" />}
                        {options?.filterable && filters[col.key] !== undefined && <FaFilter className="text-amber-500 text-sm" />}
                    </div>
                </th>
            ))}
        </tr>
        {/* ✅ 필터 입력 행 */}
        {columns.some(col => options?.filterable && filters[col.key] !== undefined) 
            ? (
                <tr className="bg-[var(--color-prime-hover)] border-b border-[var(--color-font)]">
                    {showRowNumCol ? <td className="p-2">&nbsp;</td> : null}
                    {showRowCheckboxCol ? <td className="p-2">&nbsp;</td> : null}
                    {columns.map((col) => (
                        <td key={col.key} className="p-2">
                            {col.filterable && filters[col.key] !== undefined && (
                                <input
                                    type="text"
                                    value={filters[col.key] || ""}
                                    onChange={(e) => reducer.setFilter({ ...filters, [col.key]: e.target.value })}
                                    className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary w-full p-1 border border-[var(--color-second)] bg-white text-black bg-[--color-second]"
                                    placeholder="필터 입력..."
                                />
                            )}
                        </td>
                    ))}
                </tr>
            ) : null}
        {/* ✅ 컨텍스트 메뉴 추가 */}
        {options && 
            <GridContextMenu
                menuPosition={menuPosition}
                options={options}
                onClose={closeContextMenu} 
                reducer={reducer}
            />
        }
      </thead>
      
      
    );
  };
  
  
export default GridHeader;
