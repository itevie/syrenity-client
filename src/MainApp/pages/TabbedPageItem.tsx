import { HTMLAttributes } from "react";

interface Props {
    label: string,
}

export default function TabbedPageItem(props: Props & HTMLAttributes<HTMLElement>) {
    return (
        <div className="tabbed-page-tab-item" {...props}>
            {props.label}
        </div>
    );
}