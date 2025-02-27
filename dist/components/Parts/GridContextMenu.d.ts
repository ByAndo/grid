import { GridOptions } from "../GridTypes";
import { GridReducerReturn } from "../Reducer/useGridReducer";
declare const GridContextMenu: <T>({ menuPosition, options, onClose, reducer, }: {
    menuPosition: {
        x: number;
        y: number;
        column: string;
    } | null;
    options?: GridOptions;
    onClose: () => void;
    reducer?: GridReducerReturn<T>;
}) => import("react/jsx-runtime").JSX.Element | null;
export default GridContextMenu;
