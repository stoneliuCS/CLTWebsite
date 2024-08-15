import { ReactNode } from "react"

export interface IDashboard {
  title: string
  key: string
  innerTabs: ITab[]
}

export interface ITab {
  title: string
  key: string
  accordionView: boolean
  form?: ITabForm[]
}

export interface ITabForm {
  type:
    | "input"
    | "textArea"
    | "dateInput"
    | "timeInput"
    | "drag&drop"
    | "links"
    | "autocomplete"
  name: string
  label: string
  isRequired: boolean
  placeholder?: string
  icon?: ReactNode
}
