import { atom } from "jotai"
import type { WidgetScreen } from "@/modules/widget/types"

export const screenAtom = atom<WidgetScreen>("error")

export const errorMessageAtom = atom<string | null>(null)
