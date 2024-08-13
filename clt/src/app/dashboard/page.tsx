"use client"
import tabs from "@/constant/dashboard-tabs"
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  DateInput,
  Divider,
  Input,
  Tab,
  Tabs,
  Textarea,
} from "@nextui-org/react"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { MdEventAvailable } from "react-icons/md"

export default function Dashboard() {
  const { data: session } = useSession()
  if (!session) return <div> Please Login to view content. </div>

  const renderFormItem = (tabForm: ITabForm, key: number) => {
    if (tabForm.type === "input")
      return (
        <Input
          type={tabForm.formType}
          isRequired={tabForm.isRequired}
          label={tabForm.label}
          size="sm"
          key={key}
        />
      )
    if (tabForm.type === "dateInput")
      return (
        <DateInput
          label={tabForm.label}
          isRequired={tabForm.isRequired}
          key={key}
        />
      )
    if (tabForm.type === "textArea")
      return (
        <Textarea
          label={tabForm.label}
          isRequired={tabForm.isRequired}
          key={key}
        />
      )
    return <div>Uh Oh</div>
  }
  const [currentTab, setCurrentTab] = useState(tabs[0].innerTabs[0])
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center mt-4">
      <Tabs aria-label="Options" variant="underlined">
        {tabs.map((tab) => (
          <Tab key={tab.key} title={tab.title} className="w-10/12 h-5/6">
            <Card className="bg-blue-200 h-full w-full">
              {currentTab.form ? (
                <CardBody>
                  <form className="w-6/12 flex flex-col gap-y-2">
                    {currentTab.form.map((form, key) =>
                      renderFormItem(form, key)
                    )}
                  </form>
                </CardBody>
              ) : (
                <CardBody>Nothing to see here...</CardBody>
              )}
              <Divider />
              <CardFooter className="flex align-items justify-center">
                <Tabs
                  aria-label="Inner-Options"
                  onSelectionChange={(e) => {
                    const selectedTab = tab.innerTabs.find((tab) => {
                      return tab.key === e.toString()
                    }) as ITab
                    setCurrentTab(selectedTab)
                  }}
                >
                  {tab.innerTabs.map((innerTab) => (
                    <Tab key={innerTab.key} title={innerTab.title} />
                  ))}
                </Tabs>
              </CardFooter>
            </Card>
          </Tab>
        ))}
      </Tabs>
    </div>
  )
}
