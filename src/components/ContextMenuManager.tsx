import { useEffect, useState } from "react";
import { EventOrElement } from "../util";
import MaterialIcon from "./MaterialIcon";

export let showContextMenu: (details: ContextMenuDetails) => void = () => { };
type ContextMenuItem = ContextMenuButton | ContextMenuDivider;

interface ContextMenuDetails {
    where: EventOrElement,
    items: ContextMenuItem[],
    loader?: (cb: (data: ContextMenuDetails) => void) => void,
    isLoading?: false,
}

interface BaseContextMenuItem {
}
interface ContextMenuButton extends BaseContextMenuItem {
    type: "button",
    label: string,
    onClick: () => void,
    danger?: boolean,
    hidden?: boolean,
    icon?: string,
}

interface ContextMenuDivider extends BaseContextMenuItem {
    type: "divider",
}

export default function ContextMenuManager() {
    let [shown, setShown] = useState<boolean>(false);
    let [location, setLocation] = useState<[number, number]>([0, 0]);
    let [data, setData] = useState<ContextMenuDetails | null>(null);

    useEffect(() => {
        showContextMenu = (details: ContextMenuDetails) => {
            let location: [number, number] = [0, 0];
            if (!(details.where instanceof HTMLElement)) {
                details.where.preventDefault();
                location = [details.where.pageX, details.where.pageY];
            } else {
                let bounds = details.where.getBoundingClientRect();
                location = [bounds.x, bounds.y];
            }

            setLocation(location);

            let toShow = [...details.items];

            // Remove hiddens
            toShow = toShow.filter(i => i.type === "divider" || (i.type === "button" && !i.hidden));

            // Remove unnecessary dividers
            let previousType: "button" | "divider" | null = null;
            let toShow2: ContextMenuItem[] = [];
            for (let i in toShow) {
                // Check if there is a previous and the previous and current is a divider
                if (previousType && toShow[i].type === "divider" && previousType === "divider")
                    continue;
                // Check if there is not a previous (meaning this is the first) and the current is a divider
                if (!previousType && toShow[i].type === "divider")
                    continue;
                // Check if the index is at the last and the current is a divider
                if (parseInt(i) === toShow.length - 1 && toShow[i].type === "divider")
                    continue;

                // It's okay to exist
                previousType = toShow[i].type;
                toShow2.push(toShow[i]);
            }
            toShow = toShow2;

            setData({ ...details, items: toShow });
            setShown(true);
        }
    }, []);

    return (
        <div className="ctxm-container" style={{ display: shown ? "block" : "none", top: location[1] + "px", left: location[0] + "px" }}>
            {
                !data || !data.items
                    ? <label>Loading...</label>
                    : <div>
                        {
                            data.items.map(item =>
                                item.type == "divider" ? <hr />
                                    :
                                    <div
                                        className={"ctxm-item" + (item.danger ? " ctxm-item-danger" : "")}
                                        onClick={() => { if (item.onClick) item.onClick(); setShown(false); }}>
                                        {item.icon ? <MaterialIcon icon={item.icon} /> : ""}
                                        {item.label}
                                    </div>
                            )
                        }
                    </div>
            }
        </div >
    )
}