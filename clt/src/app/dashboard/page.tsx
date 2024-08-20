"use client"
import tabs from "@/constant/dashboard-tabs"
import { ITab, ITabForm } from "@/types/IDashboard"
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  Tab,
  Tabs,
  useDisclosure,
} from "@nextui-org/react"
import { useSession } from "next-auth/react"
import { useState } from "react"
import {
  useForm,
  SubmitHandler,
  FormProvider,
} from "react-hook-form"
import "./file-preview.css"
import { FormItem } from "@/components/form/form-item"

export default function Dashboard() {
  const { data: session } = useSession()
  const methods = useForm()
  const [currentTab, setCurrentTab] = useState(tabs[0].innerTabs[0])
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const onSubmit = (key: string): SubmitHandler<any> => {
    return async (data) => {
      switch (key) {
        case "createEvent":
          const res = await fetch("/api/events", {
            method: "POST",
            body: JSON.stringify(data),
          })
          if (!res.ok) {
            alert("Error Processing Request, Please Try Again Later")
            return
          }
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
      methods.reset()
      alert("Form Submission Successful!")
    }
  }
  // const renderAccordionView = (form: ITabForm[]) => {
  //   const [required, nonRequired] = partition(form, (f) => f.isRequired)
  //   return (
  //     <Accordion variant="bordered" defaultExpandedKeys={"1"}>
  //       <AccordionItem
  //         key="1"
  //         aria-label="Accordion 1"
  //         subtitle="Press to expand"
  //         title="Required Fields*"
  //         className="mb-4"
  //         keepContentMounted
  //       >
  //         <div className="space-y-2">
  //           {required.map((form: ITabForm, key: number) =>
  //             renderFormItem(form, key)
  //           )}
  //         </div>
  //       </AccordionItem>
  //       <AccordionItem
  //         key="2"
  //         aria-label="Accordion 2"
  //         subtitle="Press to expand"
  //         title="Optional Fields"
  //         className="mb-4"
  //         keepContentMounted
  //       >
  //         <div className="space-y-2">
  //           {nonRequired.map((form: ITabForm, key: number) =>
  //             renderFormItem(form, key)
  //           )}
  //         </div>
  //       </AccordionItem>
  //     </Accordion>
  //   )
  // }
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
                  <FormProvider {...methods}>
                    <form
                      className="w-full flex flex-col space-y-2 items-center px-10"
                      onSubmit={async (e) => {
                        e.preventDefault()
                        const result = await methods.trigger()
                        if (result) {
                          onOpen()
                        }
                      }}
                    >
                      <div className="flex flex-col w-full space-y-2">
                        {currentTab.form.map((form: ITabForm, key: number) => (
                          <FormItem tabForm={form} key={key} />
                        ))}
                      </div>
                      <Button size="md" color="primary" type="submit">
                        Submit
                      </Button>
                      <Modal
                        isOpen={isOpen}
                        onOpenChange={onOpenChange}
                        isDismissable={false}
                        isKeyboardDismissDisabled={true}
                      >
                        <ModalContent>
                          {(onClose) => (
                            <>
                              <ModalBody>Confirm Action</ModalBody>
                              <ModalFooter>
                                <Button
                                  color="danger"
                                  variant="light"
                                  onPress={onClose}
                                >
                                  Close
                                </Button>
                                <Button
                                  color="primary"
                                  onPress={async () => {
                                    //Trigger some loading animation
                                    await methods.handleSubmit(
                                      onSubmit(currentTab.key)
                                    )()
                                    //Finish loading animation
                                    onClose()
                                  }}
                                >
                                  Submit
                                </Button>
                              </ModalFooter>
                            </>
                          )}
                        </ModalContent>
                      </Modal>
                    </form>
                  </FormProvider>
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
