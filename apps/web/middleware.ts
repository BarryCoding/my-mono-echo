import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

const isUserPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)"])

const isOrganizationPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/organization-select(.*)",
])

export default clerkMiddleware(async (auth, req) => {
  const { userId, orgId } = await auth()

  if (!isUserPublicRoute(req)) {
    await auth.protect()
  }

  if (userId && !orgId && !isOrganizationPublicRoute(req)) {
    const searchParams = new URLSearchParams({ redirectUrl: req.url })
    const organizationSelectUrl = new URL(
      `/organization-select?${searchParams.toString()}`,
      req.url,
    )

    return NextResponse.redirect(organizationSelectUrl)
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
}
