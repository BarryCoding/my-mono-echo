"use client"

import { useEffect, useState } from "react"
import { LoaderIcon } from "lucide-react"
import { useAtomValue, useSetAtom } from "jotai"
import {
  errorMessageAtom,
  loadingMessageAtom,
  organizationIdAtom,
  screenAtom,
} from "@/modules/widget/atoms/widget-atoms"
import { WidgetHeader } from "@/modules/widget/ui/components/widget-header"
import { useAction, useMutation } from "convex/react"
import { api } from "@workspace/backend/_generated/api"

type InitStep = "org" | "session" | "settings" | "vapi" | "done"

export const WidgetLoadingScreen = ({
  organizationId,
}: {
  organizationId: string | null
}) => {
  const [step, setStep] = useState<InitStep>("org")

  const loadingMessage = useAtomValue(loadingMessageAtom)
  const setLoadingMessage = useSetAtom(loadingMessageAtom)

  const setOrganizationId = useSetAtom(organizationIdAtom)
  const setErrorMessage = useSetAtom(errorMessageAtom)
  const setScreen = useSetAtom(screenAtom)

  // Step 1: Validate organization
  const validateOrganization = useAction(api.public.organizations.validate)
  useEffect(() => {
    if (step !== "org") {
      return
    }

    setLoadingMessage("Finding organization ID...")

    if (!organizationId) {
      setErrorMessage("Organization ID is required")
      setScreen("error")
      return
    }

    setLoadingMessage("Verifying organization...")

    validateOrganization({ organizationId })
      .then((result) => {
        if (result.valid) {
          setOrganizationId(organizationId)
          setStep("session")
        } else {
          setErrorMessage(result.reason || "Invalid configuration")
          setScreen("error")
        }
      })
      .catch(() => {
        setErrorMessage("Unable to verify organization")
        setScreen("error")
      })
  }, [
    step,
    organizationId,
    setErrorMessage,
    setScreen,
    setOrganizationId,
    setStep,
    validateOrganization,
    setLoadingMessage,
  ])

  // TODO: step

  return (
    <>
      <WidgetHeader>
        <div className="flex flex-col justify-between gap-y-2 px-2 py-6 font-semibold">
          <p className="text-3xl">Hi there! 👋</p>
          <p className="text-lg">Let&apos;s get you started</p>
        </div>
      </WidgetHeader>
      <div className="flex flex-1 flex-col items-center justify-center gap-y-4 p-4 text-muted-foreground">
        <LoaderIcon className="animate-spin" />
        <p className="text-sm">{loadingMessage || "Loading..."}</p>
      </div>
    </>
  )
}
