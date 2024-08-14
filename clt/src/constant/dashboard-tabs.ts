import { ITabDashboard } from "@/types/ITabDashboard"

const tabs: ITabDashboard[] = [
  {
    title: "Events",
    key: "events",
    innerTabs: [
      {
        title: "Create New Event",
        key: "createEvent",
        form: [
          {
            key: "eventName",
            type: "input",
            label: "Event Name",
            isRequired: true,
          },
          {
            key: "eventDate",
            type: "dateInput",
            label: "Event Date",
            isRequired: true,
          },
          {
            key: "startTime",
            type : "timeInput",
            label : "Event Start Time",
            isRequired : true,
          },
          {
            key: "endTime",
            type : "timeInput",
            label : "Event End Time",
            isRequired : true,
          },
          {
            key: "eventLocation",
            type : "input",
            label : "Event Location",
            isRequired : true,
          },
          {
            key: "eventDescription",
            type: "textArea",
            label: "Event Description",
            isRequired: true,
          },
          {
            key: "contactName",
            type: "input",
            label: "Event Contact Name",
            isRequired: false,
          },
          {
            key: "phoneNumber",
            type: "input",
            label: "Event Contact Phone Number",
            isRequired: false,
          },
          {
            key: "emailAddress",
            type: "input",
            label: "Event Contact Email Address",
            isRequired: false,
          },
          {
            key: "eventImage",
            type : "drag&drop",
            label : "Drag and Drop Your Event Image",
            isRequired : false
          }
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