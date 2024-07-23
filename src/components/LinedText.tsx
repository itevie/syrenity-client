import { Children } from "../util";

export function LinedText({ children }: { children: Children }) {
    return (
        <label className="lined-text">{children}</label>
    );
}