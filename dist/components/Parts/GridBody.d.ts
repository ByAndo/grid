import { GridColumn } from "../GridTypes";
import { GridReducerReturn } from "../Reducer/useGridReducer";
interface GridBodyProps<T> {
    columns: GridColumn<T>[];
    isCellEditable?: boolean;
    showRowNumCol?: boolean;
    showRowCheckboxCol?: boolean;
    selectedRows: Set<T>;
    onToggleRow: (row: T) => void;
    onToggleGroupExpand: (groupKey: string) => void;
    reducer: GridReducerReturn<T>;
}
declare const GridBody: <T>({ columns, showRowNumCol, showRowCheckboxCol, selectedRows, isCellEditable, onToggleRow, onToggleGroupExpand, reducer, }: GridBodyProps<T>) => import("react/jsx-runtime").JSX.Element;
export default GridBody;
