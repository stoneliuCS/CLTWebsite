import { ReactNode } from "react"

export interface IDashboard {
  title: string
  key: string
  innerTabs: ITab[]
}

export interface ITab {
  title: string
  key: string
  /* If you would like to sort the form inputs by required and non-required */
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
  key: string
  label: string
  isRequired: boolean
  placeholder?: string
  icon?: ReactNode
}
