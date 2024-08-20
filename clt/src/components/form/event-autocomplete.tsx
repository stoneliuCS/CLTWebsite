import { ITabForm } from "@/types/IDashboard"
import { IEvent } from "@/types/IEvent"
import { Autocomplete, AutocompleteItem, Spinner } from "@nextui-org/react"
import { useState, useEffect } from "react"
import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  useFormContext,
} from "react-hook-form"

interface EventAutocompleteProps {
  field: ControllerRenderProps<FieldValues, string>
  fieldState: ControllerFieldState
  tabForm: ITabForm
}

export function EventAutocomplete({
  field,
  fieldState,
  tabForm,
}: EventAutocompleteProps) {
  const { setValue } = useFormContext()
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
        console.log(e)
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    fetchEvents()
  }, [])
  const items = events
    ? events.map((event) => {
        return {
          label: event.eventName,
          value: event._id,
          description: event.eventDescription,
        }
      })
    : []
  if (isLoading)
    return (
      <div className="flex justify-center items-center">
        <Spinner />
      </div>
    )
  if (error) return <div>Error has occurred</div>
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
        <AutocompleteItem key={event.value!}>{event.label}</AutocompleteItem>
      )}
    </Autocomplete>
  )
}
