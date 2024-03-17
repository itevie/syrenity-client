interface CommandItemProps {
    children: [JSX.Element, JSX.Element],
    onClick: () => void,
}

export default function ChannelBarCommandItem(props: CommandItemProps) {
    return (
        <div className="channel-list-item" onClick={props.onClick}>
            <label>{props.children[1]}</label>
        </div>
    );
}