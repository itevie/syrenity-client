import { useEffect, useState } from "react";
import MaterialIcon from "../MaterialIcon";

// ----- Context menu datas -----
interface ContextMenuDataBase {
  attachTo: HTMLElement | null;
}

export interface ContextMenuData extends ContextMenuDataBase {
  items: ContextMenuItem[];
}

export interface AsyncContextMenuData extends ContextMenuDataBase {
  func: () => Promise<ContextMenuItem[]>;
}

// ----- Context menu parts -----
export type ContextMenuItem = ContextMenuSeperator | ContextMenuButton;
interface ContextMenuItemBase {
  hidden?: boolean;
}

interface ContextMenuSeperator extends ContextMenuItemBase {
  type: "seperator";
}

interface ContextMenuButton extends ContextMenuItemBase {
  type: "button";
  name: string;
  danger?: boolean;
  disabled?: boolean;
  icon?: "warning" | "refresh" | "delete" | 
    "link" | "copy" | "settings" | "edit" | 
    "report" | "leave" | "expand" | "pin" | 
    "edit" | "person_remove" | "download";
  click?: () => void;
}

// ----- Callbacks -----
interface ContextMenuCallback {
  close: () => void;
}

const iconMap: {[key: string]: string} = {
  link: "open_in_new",
  copy: "content_copy",
  report: "flag",
  leave: "logout",
  expand: "open_in_full",
  pin: "push_pin"
}

let _showMenu = (data: ContextMenuData | AsyncContextMenuData) => {};
let lastShown = 0;

export default function ContextMenu() {
  const [positiion, setPositiion] = useState<{ x: number, y: number, display: boolean, loading?: boolean }>({ x: 0, y: 0, display: false });
  const [data, setData] = useState<ContextMenuData>({ items: [ ], attachTo: null, });

  useEffect(() => {
    _showMenu = data => {
      // Check if async
      if ("func" in data) {
        (async () => {
          const resolved = await (data as AsyncContextMenuData).func();
          delete (data as any).func;
          _showMenu({ ...data,  items: resolved } as ContextMenuData);
        })();

        const rect = (data.attachTo as HTMLElement).getBoundingClientRect();
        setPositiion({
          x: rect.x + (rect.width / 2),
          y: rect.y + (rect.height / 2),
          display: true,
          loading: true,
        });

        return;
      }

      data = data as ContextMenuData;

      const actualData: ContextMenuItem[] = [];

      // Compute the actual stuff
      let previousType: string | null = null;
      for (const i in data.items) {
        const item = data.items[i];

        // Check for duplicate seperators
        if (item.type === "seperator" && (
          previousType === null ||
          previousType === "seperator" ||
          +i === data.items.length - 1
        )) continue;

        // Check if it is hidden
        if (item.hidden) continue;

        // Else add it to actualdata
        previousType = item.type;
        actualData.push(item);
      }

      setData({
        ...data,
        items: actualData,
      });

      const rect = (data.attachTo as HTMLElement).getBoundingClientRect();
      setPositiion({
        x: rect.x + (rect.width / 2),
        y: rect.y + (rect.height / 2),
        display: true,
      });

      lastShown = Date.now();
    }

    document.addEventListener("click", () => {
      if (50 - (Date.now() - lastShown) < 0) {
        setPositiion({ x: 0, y: 0, display: false });
      }
    });
  }, []);

  return (
    <div className="context-container" style={{ top: positiion.y, left: positiion.x, display: positiion.display ? "block" : "none" }}>
      {
        positiion.loading
        ? <label>Loading...</label>
        : (
          <>
            {data.items.map(item => (
              <div key={item.type + Math.random().toString()}>
                {
                  item.type === "seperator"
                  ? <hr></hr>
                  : (
                    <div onClick={() => {if (item.click) item.click();}} className={`context-item ${item.danger ? "context-danger" : ""} ${item.disabled ? "context-disabled" : ""}`}>
                      <label>{item.name}</label>
                      { item.icon ? <MaterialIcon className="context-icon" icon={iconMap[item.icon] || item.icon} /> : <></>}
                    </div>
                  )
                }
              </div>
            ))}
          </>
        )
      }
    </div>
  );
}

export function displayContextMenu(data: ContextMenuData | AsyncContextMenuData) {
  _showMenu(data);
}