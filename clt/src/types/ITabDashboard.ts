interface ITabDashboard {
    title : string 
    key : string
    innerTabs : ITab[]
}

interface ITab {
    title : string 
    key : string
    form? : ITabForm[]
}

interface ITabForm {
    type : "input" | "textArea" | "dateInput" | "dropdown"
    formType : string
    label : string 
    isRequired : boolean
    placeholder? : string
}