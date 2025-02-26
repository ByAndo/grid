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
        <thead className="nh-grid-header">
            <tr className="nh-grid-header-row">
                {showRowNumCol && <th className="nh-grid-header-cell">No.</th>}
                {showRowCheckboxCol && <th className="nh-grid-header-cell">✔</th>}

                {columns.map((col) => (
                    <th
                        key={col.key}
                        className={`nh-grid-header-cell ${
                            col.sticky === "left" ? "sticky-left" : ""
                        } ${col.sticky === "right" ? "sticky-right" : ""}`}
                        style={{ width: col.width ? `${col.width}px` : "auto", textAlign: col.align || "left" }}
                        title={col.tooltip}
                        onContextMenu={(event) => handleContextMenu(event, col.key)}
                    >
                        <div className="nh-grid-header-content">
                            <span>{col.label}</span>
                            {col.sortable && sortedColumn === col.key && sortDirection !== null && (
                                sortDirection === "asc" ? 
                                    <FaSortAmountUp style={{ color: "#2563EB", fontSize: "14px" }} />
                                    : <FaSortAmountDown style={{ color: "#2563EB", fontSize: "14px" }} />
                            )}
                            {group.column?.includes(col.key) && <FaLayerGroup style={{ color: "#16A34A", fontSize: "14px" }} />}
                            {options?.filterable && filters[col.key] !== undefined && <FaFilter style={{ color: "#D97706", fontSize: "14px" }} />}
                        </div>
                    </th>
                ))}
            </tr>

            {/* ✅ 필터 입력 행 */}
            {columns.some(col => options?.filterable && filters[col.key] !== undefined) 
                ? (
                    <tr className="nh-grid-filter-row">
                        {showRowNumCol ? <td style={{ padding: "8px" }}>&nbsp;</td> : null}
                        {showRowCheckboxCol ? <td style={{ padding: "8px" }}>&nbsp;</td> : null}
                        {columns.map((col) => (
                            <td key={col.key} style={{ padding: "8px" }}>
                                {col.filterable && filters[col.key] !== undefined && (
                                    <input
                                        type="text"
                                        value={filters[col.key] || ""}
                                        onChange={(e) => reducer.setFilter({ ...filters, [col.key]: e.target.value })}
                                        className="nh-grid-filter-input"
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
