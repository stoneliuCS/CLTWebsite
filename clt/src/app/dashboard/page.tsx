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
  CardHeader,
  DateInput,
  Divider,
  Input,
  Tab,
  Tabs,
  Textarea,
  TimeInput,
} from "@nextui-org/react"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { Time, CalendarDate } from "@internationalized/date"
import { useDropzone } from "react-dropzone"
import "./file-preview.css"
import { AiTwotonePicture } from "react-icons/ai"

interface FileWithPreview extends File {
  preview: string
}

export default function Dashboard() {
  const { data: session } = useSession()
  const { handleSubmit, control, setValue } = useForm()
  const [currentTab, setCurrentTab] = useState(tabs[0].innerTabs[0])
  const onSubmit = (key: string): SubmitHandler<any> => {
    return async (data) => {
      switch (key) {
        case "createEvent":
          await fetch("/api/event", {
            method: "POST",
            body: data,
          })
          break
        case "deleteEvent":
          console.log(data)
          break
        case "updateEvent":
          console.log(data)
          break
        case "createAnnouncement":
          console.log(data)
          break
        case "deleteAnnouncement":
          console.log(data)
          break
        case "updateAnnouncement":
          console.log(data)
          break
        default:
          throw new Error("Key does not match any API Endpoints")
      }
    }
  }
  const renderFormItem = (tabForm: ITabForm, key: number) => {
    switch (tabForm.type) {
      case "input":
        return (
          <Controller
            key={key}
            name={tabForm.key}
            control={control}
            defaultValue=""
            rules={{
              required: tabForm.isRequired ? "This field is required" : false,
            }}
            render={({ field, fieldState }) => (
              <Input
                {...field}
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
      case "dateInput":
        return (
          <Controller
            key={key}
            name={tabForm.key}
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
      case "textArea":
        return (
          <Controller
            key={key}
            name={tabForm.key}
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
      case "timeInput":
        return (
          <Controller
            key={key}
            name={tabForm.key}
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
      case "drag&drop":
        return (
          <Controller
            key={key}
            name={tabForm.key}
            control={control}
            defaultValue=""
            rules={{
              required: tabForm.isRequired ? "This field is required" : false,
            }}
            render={() => {
              const [files, setFiles] = useState<FileWithPreview[]>([])
              const { getRootProps, getInputProps } = useDropzone({
                maxFiles: 1,
                accept: {
                  "image/*": [],
                },
                onDrop: (acceptedFiles) => {
                  const previewFiles = acceptedFiles.map((file) =>
                    Object.assign(file, {
                      preview: URL.createObjectURL(file),
                    })
                  )
                  setFiles(previewFiles)
                  setValue(tabForm.key, previewFiles)
                },
              })
              const thumbs = files.map((file) => (
                <div className="thumb" key={file.name}>
                  <div className="thumbInner">
                    <img
                      src={file.preview}
                      className="img"
                      onLoad={() => {
                        URL.revokeObjectURL(file.preview)
                      }}
                    />
                  </div>
                </div>
              ))
              useEffect(() => {
                return () =>
                  files.forEach((file) => URL.revokeObjectURL(file.preview))
              }, [])
              return (
                <Card
                  className="border-2 border-slate-400 bg-gray-100 border-dashed w-full"
                  isPressable
                >
                  <CardBody
                    {...getRootProps({
                      className: "flex flex-col items-center justify-center",
                    })}
                  >
                    <em>Drag or drop the event image here:</em>
                    <input {...getInputProps()} style={{ display: "none" }} />
                    <aside className="thumbsContainer">
                      {thumbs.length > 0 ? (
                        thumbs
                      ) : (
                        <AiTwotonePicture size={100} />
                      )}
                    </aside>
                  </CardBody>
                </Card>
              )
            }}
          />
        )
      default:
        throw new Error("No tab form type matched.")
    }
  }
  if (!session) return <div> Please Login to view content. </div>
  return (
    <div className="w-screen h-screen flex flex-col items-center mt-4">
      <Tabs aria-label="Options" variant="underlined">
        {tabs.map((tab) => (
          <Tab key={tab.key} title={tab.title} className="w-10/12 h-full">
            <Card className="bg-blue-200 w-full">
              <CardHeader className="flex items-center justify-center">
                <div className="w-6/12">
                  <h1 className="text-center font-semibold truncate p-1">
                    {tab.title} Dashboard
                  </h1>
                  <Divider />
                </div>
              </CardHeader>
              {currentTab.form ? (
                <CardBody>
                  <form
                    className="w-full flex flex-col space-y-2 items-center px-10"
                    onSubmit={handleSubmit(onSubmit(currentTab.key))}
                  >
                    <Accordion variant="bordered" defaultExpandedKeys={"1"}>
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
                      <AccordionItem
                        key="2"
                        aria-label="Accordion 2"
                        subtitle="Press to expand"
                        title="Optional Fields"
                        className="mb-4"
                        keepContentMounted
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
