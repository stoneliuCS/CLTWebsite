import { ControllerFieldState, ControllerRenderProps, FieldValues, useFormContext } from "react-hook-form"
import { useAnnouncements } from "../layout/AnnouncementProvider"
import { useEffect, useState } from "react"
import { ITabForm } from "@/types/IDashboard"
import { IAnnouncement } from "@/types/IAnnouncement"
import { Autocomplete, AutocompleteItem, MenuTriggerAction } from "@nextui-org/react"
import { Key } from "@react-types/shared"
import { useFilter } from "@react-aria/i18n"

interface AnnouncementAutocompleteProps {
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

export function AnnouncementAutocomplete({ field,
    fieldState,
    tabForm, }: AnnouncementAutocompleteProps) {
    const announcementContext = useAnnouncements()
    const announcements = announcementContext.announcements
    const { formState, setValue, getValues } = useFormContext()
    const { isSubmitted, isDirty } = formState

    const items = announcements.map((announcements) => {
        return {
            label: announcements.announcementName,
            value: announcements._id,
            description: announcements.announcementDescription,
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
        const selectedAnnouncement = announcements.find((announcement) => { return key?.toString() === announcement._id })
        if (selectedAnnouncement) {
            const vals = getValues()
            for (const k of Object.keys(vals)) {
                const key = k as keyof IAnnouncement
                const eventVal = selectedAnnouncement[key]
                setValue(key, eventVal)
            }
        }
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
            {(announcement) => (
                <AutocompleteItem key={announcement.value!}>{announcement.label}</AutocompleteItem>
            )}
        </Autocomplete>
    )

}
