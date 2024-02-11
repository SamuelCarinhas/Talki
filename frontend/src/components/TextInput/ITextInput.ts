import React, { ReactNode } from "react";

export default interface ITextInput {
    name: string
    type?: string
    extra?: ReactNode
    error?: string | null
    setError?: React.Dispatch<React.SetStateAction<string | null>>
}
