import React, {ReactNode} from "react";

export default interface IIconButton {
    children: ReactNode
    onClick?: React.MouseEventHandler<HTMLDivElement> | undefined
}
