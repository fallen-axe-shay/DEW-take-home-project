import { ContextMenu, MenuItemModel } from "@syncfusion/ej2-navigations";
import { ContextMenuModel } from "@syncfusion/ej2-navigations";

export interface NodeLink {
    id: number;
    nodeOrLink: string;
    label: string;
    selectedOptions: Array<any>;
    noOfOptions: number;
    text: string;
    errorExists: Boolean;
    oldValue: string;
    listContext: Array<MenuItemModel>;
  }