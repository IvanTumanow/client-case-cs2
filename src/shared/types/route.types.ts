import type {ReactNode} from "react";

export type Route = {
    url: string
    title: string
    element: (() => ReactNode)
}