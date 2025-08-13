import { atom } from "jotai"
import type { WidgetScreen } from "@/modules/widget/types"

export const screenAtom = atom<WidgetScreen>("error")
export const organizationIdAtom = atom<string | null>(null)

export const errorMessageAtom = atom<string | null>(null)
export const loadingMessageAtom = atom<string | null>(null)
