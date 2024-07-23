interface ComplicatedInputProps {
    name: string,
    placeholder?: string,
    error?: string,
    type: React.InputHTMLAttributes<HTMLInputElement>["type"],
    inputRef: React.RefObject<HTMLInputElement>
}

export default function ComplicatedInput(props: ComplicatedInputProps) {
    return (
        <div className="comp-input">
            <label className="comp-input-label">{props.name}</label>
            <input className="jumbo" ref={props.inputRef} placeholder={props.placeholder ?? ""} type={props.type}></input>
            <small>{props.error ?? ""}</small>
        </div>
    )
}