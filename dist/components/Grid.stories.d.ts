import type { Meta, StoryObj } from "@storybook/react";
import Grid from "./Grid";
interface SampleData {
    id: number;
    name: string;
    age: number;
    registered: string;
}
declare const meta: Meta<typeof Grid<SampleData>>;
export default meta;
type Story = StoryObj<typeof Grid<SampleData>>;
export declare const Default: Story;
