import { Children } from "../util";

export default function SideBySide(props: {children: Children}) {
    return (
        <div style={{display: "flex", flexDirection: "row", gap: "10px", justifyContent: "space-between"}}>
            {props.children}
        </div>
    )
}