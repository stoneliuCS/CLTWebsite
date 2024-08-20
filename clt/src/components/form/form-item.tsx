import { ITabForm } from "@/types/IDashboard"
import { Autocomplete, AutocompleteItem, DateInput, Input, Textarea, TimeInput } from "@nextui-org/react"
import { Controller, useFormContext } from "react-hook-form"
import DragAndDropInput from "./drag-drop-input"
import LinksInput from "./links-input"
import { parseDate, parseTime } from "@internationalized/date"
import { useEffect, useState } from "react"
import { IEvent } from "@/types/IEvent"

interface IFormItemProps {
  tabForm: ITabForm
  key: number
}

export function FormItem({ tabForm, key }: IFormItemProps) {
  const { control, setValue } = useFormContext()
  const [events, setEvents] = useState<IEvent[] | null>(null)
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("/api/events", {
          method: "GET",
        })
        if (!res.ok) throw new Error("Error fetching all events")
        const events = await res.json()
        setEvents(events.data)
      } catch (e) {
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    fetchEvents()
  }, [])

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
          render={({ field, fieldState }) => (
            <DateInput
              {...field}
              value={field.value ? parseDate(field.value) : null}
              onChange={(d) => field.onChange(d ? d.toString() : "")}
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
          render={({ field, fieldState }) => (
            <TimeInput
              {...field}
              value={field.value ? parseTime(field.value) : null}
              onChange={(t) => field.onChange(t ? t.toString() : "")}
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
          defaultValue={null}
          rules={{
            required: tabForm.isRequired ? "This field is required" : false,
          }}
          render={({ field }) => {
            return (
              <DragAndDropInput label={tabForm.label} onDrop={field.onChange} />
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
            return (
              <LinksInput
                label={tabForm.label}
                placeholder={tabForm.placeholder}
                field={field}
              />
            )
          }}
        />
      )
    case "autocomplete":
      return (
        <Controller
          key={key}
          name={tabForm.name}
          control={control}
          defaultValue=""
          rules={{
            required: tabForm.isRequired ? "This field is required" : false,
          }}
          render={({ field, fieldState }) => {
            if (isLoading) return <div> Loading Autocomplete...</div>
            if (error) return <div> Error has occurred... </div>
            const items = events
              ? events.map((event) => {
                  return {
                    label: event.eventName,
                    value: event._id,
                    description: event.eventDescription,
                  }
                })
              : []
            return (
              <Autocomplete
                {...field}
                onSelectionChange={(s) => {
                  setValue(field.name, s)
                }}
                isInvalid={fieldState.invalid}
                errorMessage={fieldState.error?.message}
                label={tabForm.label}
                placeholder={tabForm.placeholder}
                defaultItems={items}
                isRequired={tabForm.isRequired}
              >
                {(event) => (
                  <AutocompleteItem key={event.value!}>
                    {event.label}
                  </AutocompleteItem>
                )}
              </Autocomplete>
            )
          }}
        />
      )
    default:
      throw new Error("No tab form type matched.")
  }
}
