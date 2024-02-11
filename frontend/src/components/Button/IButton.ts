import React from "react";

export default interface IButton {
    text: string
    onClick?: React.MouseEventHandler<HTMLDivElement> | undefined
}