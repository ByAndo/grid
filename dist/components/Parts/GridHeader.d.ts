import { GridColumn, GridOptions } from "../GridTypes";
import { GridReducerReturn } from "../Reducer/useGridReducer";
interface GridHeaderProps<T> {
    columns: GridColumn<T>[];
    showRowNumCol?: boolean;
    showRowCheckboxCol?: boolean;
    options?: GridOptions;
    reducer: GridReducerReturn<T>;
    editedRows: Record<string, Partial<T>>;
    style?: React.CSSProperties;
}
declare const GridHeader: <T>({ columns, showRowNumCol, showRowCheckboxCol, options, reducer, editedRows, style, }: GridHeaderProps<T>) => import("react/jsx-runtime").JSX.Element;
export default GridHeader;
