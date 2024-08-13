import { ITabDashboard } from "@/types/ITabDashboard"

const tabs: ITabDashboard[] = [
  {
    title: "Events",
    key: "events",
    innerTabs: [
      {
        title: "Create Event",
        key: "createEvent",
        form: [
          {
            formType: "eventName",
            type: "input",
            label: "Event Name",
            isRequired: true,
          },
          {
            formType: "eventDate",
            type: "dateInput",
            label: "Event Date",
            isRequired: true,
          },
          {
            formType: "eventStartTime",
            type : "timeInput",
            label : "Event Start Time",
            isRequired : true,
          },
          {
            formType: "eventEndTime",
            type : "timeInput",
            label : "Event End Time",
            isRequired : true,
          },
          {
            formType: "eventDescription",
            type: "textArea",
            label: "Event Description",
            isRequired: false,
          },
        ],
      },
      { title: "Update Existing Event", key: "updateEvent" },
      { title: "Delete Existing Event", key: "deleteEvent" },
    ],
  },
  {
    title: "Announcements",
    key: "announcements",
    innerTabs: [
      {
        title: "Create Announcement",
        key: "createAnnouncement",
      },
      {
        title: "Update Existing Announcement",
        key: "updateAnnouncement",
      },
      {
        title: "Delete Exisiting Announcement ",
        key: "deleteAnnouncement",
      },
    ],
  },
]

export default tabs