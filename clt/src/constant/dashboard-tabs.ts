import { IDashboard } from "@/types/IDashboard"

const tabs: IDashboard[] = [
  {
    title: "Events",
    key: "events",
    innerTabs: [
      {
        title: "Create New Event",
        key: "createEvent",
        accordionView : true,
        form: [
          {
            key: "eventName",
            type: "input",
            label: "Event Name",
            isRequired: true,
          },
          {
            key: "date",
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
          },
          {
            key : "eventLinks",
            type : "links",
            label : "Event Links",
            isRequired : false
          }
        ],
      },
      { title: "Update Existing Event", key: "updateEvent", accordionView : false },
      { title: "Delete Existing Event", key: "deleteEvent", accordionView : false },
    ],
  },
  {
    title: "Announcements",
    key: "announcements",
    innerTabs: [
      {
        title: "Create Announcement",
        key: "createAnnouncement",
        accordionView : false
      },
      {
        title: "Update Existing Announcement",
        key: "updateAnnouncement",
        accordionView : false
      },
      {
        title: "Delete Exisiting Announcement ",
        key: "deleteAnnouncement",
        accordionView : false
      },
    ],
  },
]

export default tabs