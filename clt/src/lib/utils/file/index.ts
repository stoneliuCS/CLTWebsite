export async function base64File(file: File) {
  try {
    const base64String = await convertFileToBase64(file)
    return base64String
  } catch (error) {
    console.error("Error converting file:", error)
  }
}

export function base64ToFile(
  base64String: string,
  fileName: string,
  fileType: string
): File {
  const byteCharacters = atob(base64String)
  const byteNumbers = new Array(byteCharacters.length)
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i)
  }
  const byteArray = new Uint8Array(byteNumbers)

  const blob = new Blob([byteArray], { type: fileType })

  const file = new File([blob], fileName, { type: fileType })

  return file
}

function convertFileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => {
      const base64String = reader.result as string
      resolve(base64String)
    }

    reader.onerror = (error) => {
      reject(error)
    }

    reader.readAsDataURL(file)
  })
}
