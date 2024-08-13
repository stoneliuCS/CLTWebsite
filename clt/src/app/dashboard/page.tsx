"use client"
import tabs from "@/constant/dashboard-tabs"
import { ITab, ITabForm } from "@/types/ITabDashboard"
import {
  Accordion,
  AccordionItem,
  Button,
  Card,
  CardBody,
  CardFooter,
  DateInput,
  Divider,
  Input,
  Tab,
  Tabs,
  Textarea,
  TimeInput,
} from "@nextui-org/react"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { Time, CalendarDate } from "@internationalized/date"

export default function Dashboard() {
  const { data: session } = useSession()
  if (!session) return <div> Please Login to view content. </div>
  const { handleSubmit, control } = useForm()
  const onSubmit: SubmitHandler<any> = (data) => {
    console.log(data)
  }
  const renderFormItem = (tabForm: ITabForm, key: number) => {
    if (tabForm.type === "input")
      return (
        <Controller
          key={key}
          name={tabForm.formType}
          control={control}
          defaultValue=""
          rules={{
            required: tabForm.isRequired ? "This field is required" : false,
          }}
          render={({ field, fieldState }) => (
            <Input
              {...field}
              type={tabForm.formType}
              isRequired={tabForm.isRequired}
              label={tabForm.label}
              placeholder={tabForm.placeholder}
              isInvalid={fieldState.invalid}
              errorMessage={fieldState.error?.message}
              size="sm"
            />
          )}
        />
      )
    if (tabForm.type === "dateInput")
      return (
        <Controller
          key={key}
          name={tabForm.formType}
          control={control}
          defaultValue={() => {
            const date = new Date()
            return new CalendarDate(
              date.getFullYear(),
              date.getMonth(),
              date.getDate()
            )
          }}
          rules={{
            required: tabForm.isRequired ? "This field is required" : false,
          }}
          render={({ field, fieldState }) => (
            <DateInput
              {...field}
              label={tabForm.label}
              isRequired={tabForm.isRequired}
              isInvalid={fieldState.invalid}
              errorMessage={fieldState.error?.message}
            />
          )}
        />
      )
    if (tabForm.type === "textArea")
      return (
        <Controller
          key={key}
          name={tabForm.formType}
          control={control}
          defaultValue=""
          rules={{
            required: tabForm.isRequired ? "This field is required" : false,
          }}
          render={({ field, fieldState }) => (
            <Textarea
              {...field}
              label={tabForm.label}
              isRequired={tabForm.isRequired}
              isInvalid={fieldState.invalid}
              errorMessage={fieldState.error?.message}
            />
          )}
        />
      )
    if (tabForm.type === "timeInput")
      return (
        <Controller
          key={key}
          name={tabForm.formType}
          control={control}
          defaultValue={new Time()}
          rules={{
            required: tabForm.isRequired ? "This field is required" : false,
          }}
          render={({ field, fieldState }) => (
            <TimeInput
              {...field}
              label={tabForm.label}
              isRequired={tabForm.isRequired}
              isInvalid={fieldState.invalid}
              errorMessage={fieldState.error?.message}
            />
          )}
        />
      )
    throw new Error("No tab form type matched.")
  }
  const [currentTab, setCurrentTab] = useState(tabs[0].innerTabs[0])
  return (
    <div className="w-screen h-screen flex flex-col items-center mt-2">
      <Tabs aria-label="Options" variant="underlined">
        {tabs.map((tab) => (
          <Tab key={tab.key} title={tab.title} className="w-10/12 h-full">
            <Card className="bg-blue-200 w-full">
              {currentTab.form ? (
                <CardBody>
                  <form
                    className="w-full flex flex-col space-y-2 items-center px-10"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className="w-6/12">
                      <h1 className="text-center font-semibold truncate p-1">
                        {tab.title} Dashboard
                      </h1>
                      <Divider />
                    </div>
                    <Accordion variant="bordered">
                      <AccordionItem
                        key="1"
                        aria-label="Accordion 1"
                        subtitle="Press to expand"
                        title="Required Fields*"
                        className="mb-4"
                        keepContentMounted
                      >
                        <div className="space-y-2">
                        {currentTab.form
                      .filter((form: ITabForm) => form.isRequired)
                      .map((form: ITabForm, key: number) =>
                        renderFormItem(form, key)
                      )}
                        </div>
                      </AccordionItem>
                    </Accordion>
                    <Accordion variant="bordered">
                      <AccordionItem
                        key="2"
                        aria-label="Accordion 2"
                        subtitle="Press to expand"
                        title="Optional Fields"
                        className="mb-4"
                      >
                        <div className="space-y-2">
                          {currentTab.form
                            .filter((form: ITabForm) => !form.isRequired)
                            .map((form: ITabForm, key: number) =>
                              renderFormItem(form, key)
                            )}
                        </div>
                      </AccordionItem>
                    </Accordion>
                    <Button size="md" color="primary" type="submit">
                      Submit
                    </Button>
                  </form>
                </CardBody>
              ) : (
                <CardBody>Nothing to see here...</CardBody>
              )}
              <Divider />
              <CardFooter className="flex align-items justify-center">
                <Tabs
                  aria-label="Inner-Options"
                  className="overflow-x-scroll"
                  onSelectionChange={(e) => {
                    const selectedTab = tab.innerTabs.find((tab: ITab) => {
                      return tab.key === e.toString()
                    }) as ITab
                    setCurrentTab(selectedTab)
                  }}
                >
                  {tab.innerTabs.map((innerTab: ITab) => (
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
