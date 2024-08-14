import { ReactNode } from "react"

export interface ITabDashboard {
  title: string
  key: string
  innerTabs: ITab[]
}

export interface ITab {
  title: string
  key: string
  form?: ITabForm[]
}

export interface ITabForm {
  type: "input" | "textArea" | "dateInput" | "timeInput" | "drag&drop"
  key: string
  label: string
  isRequired: boolean
  placeholder?: string
  icon?: ReactNode
}
