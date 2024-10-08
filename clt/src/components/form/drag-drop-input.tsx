import { base64File } from "@/lib/utils/file"
import { Button, Card, CardBody } from "@nextui-org/react"
import { useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"
import { useFormContext } from "react-hook-form"
import { AiTwotonePicture } from "react-icons/ai"

interface FileWithPreview extends File {
  preview: string
}

interface DragAndDropProps {
  label: string
  onDrop: (val: any) => void
}

export default function DragAndDropInput({ label, onDrop }: DragAndDropProps) {
  const [file, setFile] = useState<FileWithPreview>()
  const { formState } = useFormContext()
  const { isSubmitted, isDirty } = formState;

  useEffect(() => {
    if (!isSubmitted && !isDirty) {
      if (file) URL.revokeObjectURL(file.preview)
      setFile(undefined)
    }
  }, [isDirty])

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: async (acceptedFiles) => {
      //Only accept the first file
      const file = acceptedFiles[0] as unknown as FileWithPreview
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
      setFile(file)
      const base64 = await base64File(file)
      const f = {
        fileType: file.type,
        fileName: file.name,
        base64: base64,
        filePreview: file.preview
      }
      onDrop(f)
    },
  })

  const thumb = file ? (
    <div className="thumb" key={file.name}>
      <div className="thumbInner">
        <img
          src={file.preview}
          className="img"
          onLoad={() => {
          }}
        />
      </div>
    </div>
  ) : (
    <AiTwotonePicture size={100} />
  )

  useEffect(() => {
    return () => {
      if (file) URL.revokeObjectURL(file.preview)
    }
  }, [])

  return (
    <div className="flex flex-col justify-center items-center gap-y-2">
      <Card
        className="border-2 border-slate-400 bg-gray-100 border-dashed w-full"
        isPressable
        isHoverable
      >
        <CardBody
          {...getRootProps({
            className: "flex flex-col items-center justify-center",
          })}
        >
          <em>{label}</em>
          <input {...getInputProps()} style={{ display: "none" }} />
          <aside className="thumbsContainer">{thumb}</aside>
        </CardBody>

      </Card>
      <Button color="primary" onClick={() => { setFile(undefined); onDrop("") }}> Clear Photo </Button>
    </div>
  )
}
