import { ITabForm } from "@/types/IDashboard"
import {
  Autocomplete,
  AutocompleteItem,
  MenuTriggerAction,
} from "@nextui-org/react"
import { useState, useEffect } from "react"
import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  useFormContext,
} from "react-hook-form"
import { useFilter } from "@react-aria/i18n"
import { Key } from "@react-types/shared"
import { useEvents } from "../layout/EventsProvider"
import { IEvent } from "@/types/IEvent"

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
  const eventContext = useEvents()
  const events = eventContext.events
  const { formState, setValue, getValues } = useFormContext()
  const { isSubmitted, isDirty } = formState

  const items = events.map((event) => {
    return {
      label: event.eventName,
      value: event._id,
      description: event.eventDescription,
    }
  })

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

  const { startsWith } = useFilter({ sensitivity: "base" })

  const onSelectionChange = (key: React.Key | null) => {
    field.onChange(key)
    const selectedEvent = events.find((event) => { return key?.toString() === event._id })
    if (selectedEvent) {
      const vals = getValues()
      for (const k of Object.keys(vals)) {
        const key = k as keyof IEvent
        const eventVal = selectedEvent[key]
        setValue(key, eventVal)
      }
    }
    console.log(getValues())
    setState((prevState) => {
      let selectedItem = prevState.items.find((option) => option.value === key)
      return {
        inputValue: selectedItem?.label || "",
        selectedKey: key,
        items: items.filter((item) =>
          startsWith(item.label, selectedItem?.label || "")
        ),
      }
    })
  }

  const onInputChange = (value: string) => {
    setState((prevState) => ({
      inputValue: value,
      selectedKey: value === "" ? null : prevState.selectedKey,
      items: items.filter((item) => startsWith(item.label, value)),
    }))
  }

  const onOpenChange = (isOpen: boolean, menuTrigger: MenuTriggerAction) => {
    if (menuTrigger === "focus" && isOpen) {
      setState((prevState) => ({
        inputValue: prevState.inputValue,
        selectedKey: prevState.selectedKey,
        items: items,
      }))
    }
  }

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
