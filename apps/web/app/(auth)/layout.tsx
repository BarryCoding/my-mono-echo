export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="min-h-svh flex items-center justify-center">
      {children}
    </section>
  )
}
