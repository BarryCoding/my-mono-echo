/**
 * Provides a centered layout wrapper that vertically and horizontally centers its children within the viewport.
 *
 * @param children - The content to be displayed within the centered layout
 */
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="min-h-svh flex items-center justify-center">
      {children}
    </section>
  )
}
