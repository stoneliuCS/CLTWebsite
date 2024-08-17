"use client"
import tabs from "@/constant/dashboard-tabs"
import { ITab, ITabForm } from "@/types/IDashboard"
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
import {
  useForm,
  SubmitHandler,
  Controller,
  useFieldArray,
} from "react-hook-form"
import { useDropzone } from "react-dropzone"
import "./file-preview.css"
import { AiTwotonePicture } from "react-icons/ai"
import { FaRegTrashAlt } from "react-icons/fa"
import { partition } from "@/lib/utils"

interface FileWithPreview extends File {
  preview: string
}

export default function Dashboard() {
  const { data: session } = useSession()
  const { handleSubmit, control, setValue, register } = useForm()
  const [currentTab, setCurrentTab] = useState(tabs[0].innerTabs[0])
  const onSubmit = (key: string): SubmitHandler<any> => {
    return async (data) => {
      switch (key) {
        case "createEvent":
          await fetch("/api/event", {
            method: "POST",
            body: JSON.stringify(data),
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
          throw new Error("Key does not match any API endpoints")
      }
    }
  }
  const renderFormItem = (tabForm: ITabForm, key: number) => {
    switch (tabForm.type) {
      case "input":
        return (
          <Controller
            key={key}
            name={tabForm.name}
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
            name={tabForm.name}
            control={control}
            defaultValue=""
            rules={{
              required: tabForm.isRequired ? "This field is required" : false,
            }}
            render={({ field: { onChange }, fieldState }) => (
              <DateInput
                onChange={(d) => onChange(d ? d.toString() : "")}
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
            name={tabForm.name}
            control={control}
            defaultValue=""
            rules={{
              required: tabForm.isRequired ? "This field is required" : false,
            }}
            render={({ field: { onChange }, fieldState }) => (
              <TimeInput
                onChange={(t) => onChange(t ? t.toString() : "")}
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
            name={tabForm.name}
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
                placeholder={tabForm.placeholder}
              />
            )}
          />
        )
      case "drag&drop":
        return (
          <Controller
            key={key}
            name={tabForm.name}
            control={control}
            rules={{
              required: tabForm.isRequired ? "This field is required" : false,
            }}
            render={({ field }) => {
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
                  setValue(field.name, previewFiles)
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
                    <em>{tabForm.label}</em>
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
      case "links":
        return (
          <Controller
            key={key}
            name={tabForm.name}
            control={control}
            defaultValue={[]}
            rules={{
              required: tabForm.isRequired ? "This field is required" : false,
            }}
            render={({ field }) => {
              const { fields, append, remove } = useFieldArray({
                control,
                name: field.name,
              })
              return (
                <Card className="w-full bg-gray-100">
                  <CardHeader className="flex justify-center items-center">
                    <p>{tabForm.label}</p>
                  </CardHeader>
                  <Divider />
                  <CardBody className="flex justify-center items-center space-y-2">
                    {fields.length > 0 ? (
                      fields.map((f, index) => (
                        <div
                          key={f.id}
                          className="w-full flex flex-row space-x-2 items-center justify-center"
                        >
                          <Input
                            {...register(`${field.name}[${index}]`, {
                              required: "This field is required"
                            })}
                            defaultValue={field.value[index] || ""}
                            variant="bordered"
                            label="Link"
                            size="sm"
                            placeholder={tabForm.placeholder}
                          />
                          <Button
                            size="lg"
                            color="danger"
                            onPress={() => remove(index)}
                            isIconOnly
                          >
                            <FaRegTrashAlt />
                          </Button>
                        </div>
                      ))
                    ) : (
                      <em>No links yet...</em>
                    )}
                  </CardBody>
                  <Divider />
                  <CardFooter className="flex flex-row justify-center space-x-2">
                    <Button size="sm" onPress={() => append("")}>
                      <p className="truncate">Add</p>
                    </Button>
                  </CardFooter>
                </Card>
              )
            }}
          />
        )
      default:
        throw new Error("No tab form type matched.")
    }
  }
  const renderAccordionView = (form: ITabForm[]) => {
    const [required, nonRequired] = partition(form, (f) => f.isRequired)
    return (
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
            {required.map((form: ITabForm, key: number) =>
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
            {nonRequired.map((form: ITabForm, key: number) =>
              renderFormItem(form, key)
            )}
          </div>
        </AccordionItem>
      </Accordion>
    )
  }
  if (!session) return <div> Please Login to view content. </div>
  return (
    <div className="w-screen h-screen flex flex-col items-center mt-4">
      <Tabs aria-label="Options" variant="underlined">
        {tabs.map((tab) => (
          <Tab key={tab.key} title={tab.title} className="w-10/12 h-full">
            <Card className="bg-blue-200 w-full">
              <CardHeader className="flex items-center justify-center">
                <div className="w-full">
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
                    {currentTab.accordionView ? (
                      renderAccordionView(currentTab.form)
                    ) : (
                      <div className="flex flex-col w-full space-y-2">
                        {currentTab.form.map((form: ITabForm, key: number) =>
                          renderFormItem(form, key)
                        )}
                      </div>
                    )}
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
