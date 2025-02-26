import { GridColumn } from "../GridTypes";
import { GridState } from "../Reducer/GridReducer";
interface GridBodyProps<T> {
    gridState: GridState<T>;
    columns: GridColumn<T>[];
    showRowNumCol?: boolean;
    showRowCheckboxCol?: boolean;
    selectedRows: Set<T>;
    onToggleRow: (row: T) => void;
    onToggleGroupExpand: (groupKey: string) => void;
}
declare const GridBody: <T>({ gridState, columns, showRowNumCol, showRowCheckboxCol, selectedRows, onToggleRow, onToggleGroupExpand, }: GridBodyProps<T>) => import("react/jsx-runtime").JSX.Element;
export default GridBody;
