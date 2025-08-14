import { atom } from "jotai"
import { atomWithStorage, atomFamily } from "jotai/utils"
import { CONTACT_SESSION_KEY } from "@/modules/widget/constants"
import type { WidgetScreen } from "@/modules/widget/types"
import type { Id } from "@workspace/backend/_generated/dataModel"

export const screenAtom = atom<WidgetScreen>("loading")
export const organizationIdAtom = atom<string | null>(null)

export const errorMessageAtom = atom<string | null>(null)
export const loadingMessageAtom = atom<string | null>(null)

export const contactSessionIdAtomFamily = atomFamily(
  (organizationId: string) => {
    return atomWithStorage<Id<"contactSessions"> | null>(
      `${CONTACT_SESSION_KEY}_${organizationId}`,
      null,
    )
  },
)
