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
  Spinner,
  Tab,
  Tabs,
  useDisclosure,
} from "@nextui-org/react"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { useForm, SubmitHandler, FormProvider } from "react-hook-form"
import "./file-preview.css"
import { FormItem } from "@/components/form/form-item"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export default function Dashboard() {
  const { data: session } = useSession()
  const methods = useForm()
  const [currentTab, setCurrentTab] = useState(tabs[0].innerTabs[0])
  const [loading, setLoading] = useState(false)
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const onSubmit = (event: string): SubmitHandler<any> => {
    let res = {} as Response
    let msg
    return async (data) => {
      switch (event) {
        case "createEvent":
          res = await fetch("/api/events", {
            method: "POST",
            body: JSON.stringify(data),
          })
          msg = await res.json()
          if (!res.ok) {
            toast.error(msg.message)
            return
          }
          break
        case "deleteEvent":
          res = await fetch(`/api/events/${data._id}`, {
            method: "DELETE",
            body: JSON.stringify(data),
          })
          msg = await res.json()
          if (!res.ok) {
            toast.error(msg.message)
            return
          }
          break
        case "updateEvent":
          res = await fetch(`/api/events/${data._id}`, {
            method: "PATCH",
            body: JSON.stringify(data),
          })
          msg = await res.json()
          if (!res.ok) {
            toast.error(msg.message)
            return
          }
          break
        case "createAnnouncement":
          res = await fetch(`/api/announcements`, {
            method: "POST",
            body: JSON.stringify(data)
          })
          msg = await res.json()
          if (!res.ok) {
            toast.error(msg.message)
            return
          }
          break
        case "deleteAnnouncement":
          res = await fetch(`/api/announcements/${data._id}`, {
            method : "DELETE",
            body: JSON.stringify(data)
          })
          msg = await res.json()
          if (!res.ok) {
            toast.error(msg.message)
            return
          }
          break
        case "updateAnnouncement":
          res = await fetch(`/api/announcements/${data._id}`, {
            method : "PATCH",
            body: JSON.stringify(data)
          })
          msg = await res.json()
          if (!res.ok) {
            toast.error(msg.message)
            return
          }
          break
        default:
          throw new Error("Key does not match any API endpoints")
      }
      toast.success("Successfully Submitted!")
      window.location.reload()
    }
  }

  if (!session) return <div> Please Login to view content. </div>

  return (
    <div className="w-screen h-screen flex flex-col items-center mt-4">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        theme="light"
      />
      <Tabs aria-label="Options" variant="underlined" onSelectionChange={() => methods.reset()}>
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
                          <div key={key}>
                            <FormItem tabForm={form} />
                          </div>
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
                              <ModalBody>
                                {loading ? (
                                  <Spinner />
                                ) : (
                                  <div>Are you sure?</div>
                                )}
                              </ModalBody>
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
                                    setLoading(true)
                                    await methods.handleSubmit(
                                      onSubmit(currentTab.key)
                                    )()
                                    setLoading(false)
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
                    methods.reset()
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
