import { ITabForm } from "@/types/IDashboard"
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Input,
} from "@nextui-org/react"
import { useEffect } from "react"
import { Controller, useFieldArray, useFormContext } from "react-hook-form"
import { FaRegTrashAlt } from "react-icons/fa"

interface LinkInputProps {
  tabForm: ITabForm
}

export default function LinksInput({ tabForm }: LinkInputProps) {
  const { control, formState, setValue } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    control,
    name: tabForm.name,
  })
  const { isSubmitted, isDirty } = formState;

  useEffect(() => {
    if (!isSubmitted && !isDirty) {
      setValue(tabForm.name, [])
    }
  }, [isDirty])
  
  return (
    <Card className="w-full bg-gray-100">
      <CardHeader className="flex justify-center items-center">
        <p>{tabForm.label}</p>
      </CardHeader>
      <Divider />
      <CardBody className="flex justify-center items-center space-y-2">
        {fields.length > 0 ? (
          fields.map((item, index) => (
            <div
              key={item.id}
              className="w-full flex flex-row space-x-2 items-center justify-center"
            >
              <Controller
                name={`${tabForm.name}[${index}]`}
                control={control}
                defaultValue={[]}
                rules={{
                  required: "This field is required",
                }}
                render={({ field, fieldState }) => {
                  return (
                    <Input
                      {...field}
                      isRequired
                      label={"Add a Link"}
                      placeholder={tabForm.placeholder}
                      isInvalid={fieldState.invalid}
                      errorMessage={fieldState.error?.message}
                      size="sm"
                    />
                  )
                }}
              />
              <Button
                size="lg"
                color="danger"
                onPress={() => remove(index)}
                isIconOnly
              >
                <FaRegTrashAlt />
              </Button>
            </div>
          ))
        ) : (
          <em>No links yet...</em>
        )}
      </CardBody>
      <Divider />
      <CardFooter className="flex flex-row justify-center space-x-2">
        <Button size="sm" onPress={() => append("")}>
          <p className="truncate">Add</p>
        </Button>
      </CardFooter>
    </Card>
  )
}
