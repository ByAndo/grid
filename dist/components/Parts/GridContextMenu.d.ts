import { GridOptions } from "../GridTypes";
import { GridReducerReturn } from "../Reducer/useGridReducer";
interface GridContextMenuProps<T> {
    menuPosition: {
        x: number;
        y: number;
        column: string;
    } | null;
    options?: GridOptions;
    onClose: () => void;
    reducer?: GridReducerReturn<T>;
}
declare const GridContextMenu: <T>({ menuPosition, options, onClose, reducer, }: GridContextMenuProps<T>) => import("react/jsx-runtime").JSX.Element | null;
export default GridContextMenu;
