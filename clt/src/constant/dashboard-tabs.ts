import { IDashboard } from "@/types/IDashboard"

const tabs: IDashboard[] = [
  {
    title: "Events",
    key: "events",
    innerTabs: [
      {
        title: "Create New Event",
        key: "createEvent",
        accordionView: true,
        form: [
          {
            name: "eventName",
            type: "input",
            label: "Event Name",
            isRequired: true,
          },
          {
            name: "date",
            type: "dateInput",
            label: "Event Date",
            isRequired: true,
          },
          {
            name: "startTime",
            type: "timeInput",
            label: "Event Start Time",
            isRequired: true,
          },
          {
            name: "endTime",
            type: "timeInput",
            label: "Event End Time",
            isRequired: true,
          },
          {
            name: "eventLocation",
            type: "input",
            label: "Event Location",
            isRequired: true,
          },
          {
            name: "eventDescription",
            type: "textArea",
            label: "Event Description",
            isRequired: true,
          },
          {
            name: "contactName",
            type: "input",
            label: "Event Contact Name",
            isRequired: false,
          },
          {
            name: "phoneNumber",
            type: "input",
            label: "Event Contact Phone Number",
            isRequired: false,
          },
          {
            name: "emailAddress",
            type: "input",
            label: "Event Contact Email Address",
            isRequired: false,
          },
          {
            name: "eventImage",
            type: "drag&drop",
            label: "Drag and Drop Your Event Image",
            isRequired: false,
          },
          {
            name: "eventLinks",
            type: "links",
            label: "Event Links",
            isRequired: false,
          },
        ],
      },
      {
        title: "Update Existing Event",
        key: "updateEvent",
        accordionView: false,
        form: [
          {
            name: "eventName",
            type: "input",
            label: "Edit Event Name",
            isRequired: false,
          },
          {
            name: "date",
            type: "dateInput",
            label: "Edit Event Date",
            isRequired: false,
          },
          {
            name: "startTime",
            type: "timeInput",
            label: "Edit Event Start Time",
            isRequired: false,
          },
          {
            name: "endTime",
            type: "timeInput",
            label: "Edit Event End Time",
            isRequired: false,
          },
          {
            name: "eventLocation",
            type: "input",
            label: "Edit Event Location",
            isRequired: false,
          },
          {
            name: "eventDescription",
            type: "textArea",
            label: "Edit Event Description",
            isRequired: false,
          },
          {
            name: "contactName",
            type: "input",
            label: "Edit Event Contact Name",
            isRequired: false,
          },
          {
            name: "phoneNumber",
            type: "input",
            label: "Edit Event Contact Phone Number",
            isRequired: false,
          },
          {
            name: "emailAddress",
            type: "input",
            label: "Edit Event Contact Email Address",
            isRequired: false,
          },
          {
            name: "eventImage",
            type: "drag&drop",
            label: "Drag and Drop Your Event Image",
            isRequired: false,
          },
          {
            name: "eventLinks",
            type: "links",
            label: "Edit Event Links",
            isRequired: false,
          },
        ],
      },
      {
        title: "Delete Existing Event",
        key: "deleteEvent",
        accordionView: false,
      },
    ],
  },
  {
    title: "Announcements",
    key: "announcements",
    innerTabs: [
      {
        title: "Create Announcement",
        key: "createAnnouncement",
        accordionView: false,
      },
      {
        title: "Update Existing Announcement",
        key: "updateAnnouncement",
        accordionView: false,
      },
      {
        title: "Delete Exisiting Announcement ",
        key: "deleteAnnouncement",
        accordionView: false,
      },
    ],
  },
]

export default tabs
