import { ITabForm } from "@/types/IDashboard"
import {
  DateInput,
  Input,
  Textarea,
  TimeInput,
} from "@nextui-org/react"
import { Controller, useFormContext } from "react-hook-form"
import DragAndDropInput from "./drag-drop-input"
import LinksInput from "./links-input"
import { parseDate, parseTime } from "@internationalized/date"
import { EventAutocomplete } from "./event-autocomplete"

interface IFormItemProps {
  tabForm: ITabForm
}

export function FormItem({ tabForm }: IFormItemProps) {
  const { control } = useFormContext()
  switch (tabForm.type) {
    case "input":
      return (
        <Controller
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
      return <LinksInput tabForm={tabForm} />
    case "eventAutocomplete":
      return (
        <Controller
          name={tabForm.name}
          control={control}
          defaultValue=""
          rules={{
            required: tabForm.isRequired ? "This field is required" : false,
          }}
          render={({ field, fieldState }) => {
            return (
              <EventAutocomplete
                tabForm={tabForm}
                field={field}
                fieldState={fieldState}
              />
            )
          }}
        />
      )
    default:
      throw new Error("No tab form type matched.")
  }
}
