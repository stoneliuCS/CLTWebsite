import { ReactNode } from "react"

export interface ITabDashboard {
  title: string
  key: ITabTypes
  innerTabs: ITab[]
}

export interface ITab {
  title: string
  key: string
  form?: ITabForm[]
}

export interface ITabForm {
  type: "input" | "textArea" | "dateInput" | "timeInput" | "drag&drop"
  formType: string
  label: string
  isRequired: boolean
  placeholder?: string
  icon?: ReactNode
}

export type ITabTypes = "events" | "announcements"