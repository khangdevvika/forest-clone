import { useSetAtom } from "jotai"
import { useEffect } from "react"
import { headerConfigAtom, HeaderConfig } from "@/store/header.atoms"

export function useHeader(config: HeaderConfig) {
  const setHeader = useSetAtom(headerConfigAtom)

  useEffect(() => {
    setHeader(config)
    // No cleanup to avoid flickering on navigation if the next page also sets it
  }, [config, setHeader])
}
