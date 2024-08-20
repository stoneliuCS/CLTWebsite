import { base64File } from "@/lib/utils/file"
import { Card, CardBody } from "@nextui-org/react"
import { useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"
import { AiTwotonePicture } from "react-icons/ai"

interface FileWithPreview extends File {
  preview: string
}

interface DragAndDropProps {
  label: string
  onDrop : (val : any) => void
}

export default function DragAndDropInput({ label, onDrop }: DragAndDropProps) {
  const [file, setFile] = useState<FileWithPreview>()

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: async (acceptedFiles) => {
      //Only accept the first file
      const file = acceptedFiles[0]
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
      setFile(file as unknown as FileWithPreview)
      const base64 = await base64File(file)
      const f = {
        fileType: file.type,
        fileName: file.name,
        base64: base64,
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
            URL.revokeObjectURL(file.preview)
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
    <Card
      className="border-2 border-slate-400 bg-gray-100 border-dashed w-full"
      isPressable
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
  )
}
