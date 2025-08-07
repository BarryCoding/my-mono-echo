import { SignIn } from "@clerk/nextjs"

/**
 * Renders the sign-in page using Clerk's authentication UI.
 *
 * Displays the Clerk-provided `SignIn` component for user authentication.
 */
export default function Page() {
  return <SignIn />
}
