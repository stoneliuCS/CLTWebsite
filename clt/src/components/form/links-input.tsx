import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Input,
} from "@nextui-org/react"
import {
  ControllerRenderProps,
  FieldValues,
  useFieldArray,
  useFormContext,
} from "react-hook-form"
import { FaRegTrashAlt } from "react-icons/fa"

interface LinkInputProps {
  label?: string
  placeholder?: string
  field: ControllerRenderProps<FieldValues, string>
}

export default function LinksInput({
  label,
  field,
  placeholder,
}: LinkInputProps) {
  const { control, register } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    control,
    name: field.name,
  })
  return (
    <Card className="w-full bg-gray-100">
      <CardHeader className="flex justify-center items-center">
        <p>{label}</p>
      </CardHeader>
      <Divider />
      <CardBody className="flex justify-center items-center space-y-2">
        {fields.length > 0 ? (
          fields.map((item, index) => (
            <div
              key={item.id}
              className="w-full flex flex-row space-x-2 items-center justify-center"
            >
              <Input
                defaultValue={""}
                variant="bordered"
                isRequired
                label="Link"
                size="sm"
                placeholder={placeholder}
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
