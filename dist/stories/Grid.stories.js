import Grid from "../components/Grid";
const meta = {
    title: "Components/Grid",
    component: Grid,
};
export default meta;
// ✅ 샘플 데이터
const data = [
    { id: 1, name: "Alice", age: 25, registered: "2024-01-10" },
    { id: 2, name: "Bob", age: 30, registered: "2023-05-22" },
    { id: 3, name: "Charlie", age: 28, registered: "2022-08-15" },
    { id: 4, name: "Alice", age: 22, registered: "2024-01-10" },
    { id: 5, name: "Bob", age: 34, registered: "2023-05-22" },
    { id: 6, name: "Charlie", age: 48, registered: "2022-08-15" },
    { id: 7, name: "Alice", age: 22, registered: "2024-01-10" },
    { id: 8, name: "Bob", age: 34, registered: "2023-05-22" },
    { id: 9, name: "Charlie", age: 48, registered: "2022-08-15" },
];
const columns = [
    { key: "name", label: "이름", sortable: true, filterable: true, width: 100 },
    { key: "age", label: "나이", sortable: true, filterable: true, width: 100 },
    { key: "registered", label: "가입일", sortable: true },
];
export const Default = {
    args: {
        columns,
        data,
        options: {
            sortable: true,
            filterable: true,
            grouping: true,
        },
        pagingable: true,
        pagination: {
            pageSize: 5,
            currentPage: 1,
        },
        isCellEditable: true,
        showRowCheckboxCol: true,
    },
};
