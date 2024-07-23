import MaterialIcon from "../../components/MaterialIcon"
import { Child } from "../../util"

interface SettingDetails {
    label: string,
    icon: string,
    children?: Child,
    onClick?: Function,
}

export default function PageSetting(props: SettingDetails) {
    return (
        <div
            className={
                "page-setting-container "
                + (props.onClick ? "page-setting-container-clickable" : "")}
            onClick={() => { if (props.onClick) props.onClick() }}
        >
            <MaterialIcon icon={props.icon} />
            <label>{props.label}</label>
            {
                props.children
                    ? <div className="page-setting-input">
                        {props.children}
                    </div>
                    : <></>
            }
        </div>
    )
}