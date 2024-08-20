import { ITabForm } from "@/types/IDashboard"
import { IEvent } from "@/types/IEvent"
import { Autocomplete, AutocompleteItem, MenuTriggerAction, Spinner } from "@nextui-org/react"
import { useState, useEffect } from "react"
import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  useFormContext,
} from "react-hook-form"
import {useFilter} from "@react-aria/i18n";
import { Key } from "@react-types/shared"; // Import the Key type

interface EventAutocompleteProps {
  field: ControllerRenderProps<FieldValues, string>
  fieldState: ControllerFieldState
  tabForm: ITabForm
}

type FieldState = {
  selectedKey: React.Key | null | undefined 
  inputValue: string
  items: {
    label: string
    value: string
    description: string
  }[]
}

export function EventAutocomplete({
  field,
  fieldState,
  tabForm,
}: EventAutocompleteProps) {
  const [events, setEvents] = useState<IEvent[] | null>(null)
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const { formState } = useFormContext()
  const { isSubmitted, isDirty } = formState

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
          value: event._id!,
          description: event.eventDescription,
        }
      })
    : []

  const [state, setState] = useState<FieldState>({
    selectedKey: "",
    inputValue: "",
    items: items,
  })

  useEffect(() => {
    if (!isSubmitted && !isDirty) {
      setState({
        selectedKey: "",
        inputValue: "",
        items: items,
      })
    }
  }, [isDirty])

  const {startsWith} = useFilter({sensitivity: "base"});

  const onSelectionChange = (key: React.Key | null) => {
    field.onChange(key)
    console.log(key)
    setState((prevState) => {
      let selectedItem = prevState.items.find((option) => option.value === key);
      return {
        inputValue: selectedItem?.label || "",
        selectedKey: key,
        items: items.filter((item) => startsWith(item.label, selectedItem?.label || "")),
      };
    });
  };

  const onInputChange = (value: string) => {
    setState((prevState) => ({
      inputValue: value,
      selectedKey: value === "" ? null : prevState.selectedKey,
      items: items.filter((item) => startsWith(item.label, value)),
    }));
  };

  const onOpenChange = (isOpen: boolean, menuTrigger: MenuTriggerAction) => {
    console.log(isOpen, menuTrigger)
    if (menuTrigger === "manual" && isOpen) {
      setState((prevState) => ({
        inputValue: prevState.inputValue,
        selectedKey: prevState.selectedKey,
        items: items,
      }));
    }
  };


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
      isInvalid={fieldState.invalid}
      errorMessage={fieldState.error?.message}
      label={tabForm.label}
      placeholder={tabForm.placeholder}
      isRequired={tabForm.isRequired}
      onSelectionChange={onSelectionChange}
      inputValue={state.inputValue}
      items={state.items}
      selectedKey={state.selectedKey as Key}
      onInputChange={onInputChange}
      onOpenChange={onOpenChange}
    >
      {(event) => (
        <AutocompleteItem key={event.value!}>{event.label}</AutocompleteItem>
      )}
    </Autocomplete>
  )
}
