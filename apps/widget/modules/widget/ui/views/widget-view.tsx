"use client"

import { WidgetFooter } from "../components/widget-footer"
import { WidgetHeader } from "../components/widget-header"

interface Props {
  organizationId: string | null
}

export const WidgetView = ({ organizationId }: Props) => {
  return (
    <main className="min-h-screen min-w-screen flex h-full w-full flex-col overflow-hidden rounded-xl border bg-muted">
      <WidgetHeader>
        <div className="flex flex-col justify-between gap-y-2 px-2 py-6 font-semibold">
          <p className="text-3xl">Hi there! 👋</p>
          <p className="text-lg">Let&apos;s get you started</p>
        </div>
      </WidgetHeader>
      <div className="flex-1">WidgetView: {organizationId}</div>
      <WidgetFooter />
    </main>
  )
}

// http://localhost:3020/?organizationId=111
