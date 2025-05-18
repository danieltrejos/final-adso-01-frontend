import { Button } from "@/components/ui/button"
import { BookOpen } from "lucide-react"
import { TransitionLink } from "@/components/ui/transition-link"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-emerald-600" />
          <span className="text-xl font-bold">Biblio App</span>
        </div>
        <nav className="flex gap-4">
          <TransitionLink href="#caracteristicas" className="text-sm font-medium">
            Características
          </TransitionLink>
          <TransitionLink href="#acerca-de" className="text-sm font-medium">
            Acerca de
          </TransitionLink>
        </nav>
      </header>
      <main className="flex-1">
        <section className="bg-gradient-to-b from-emerald-50 to-emerald-100 py-20">
          <div className="container flex flex-col items-center text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Gestiona tu colección de libros
              <br />
              de forma sencilla y rápida
            </h1>
            <p className="mt-6 max-w-3xl text-lg text-muted-foreground">
              Una aplicación simple pero potente para catalogar, organizar y gestionar todos tus libros en un solo
              lugar.
            </p>
            <Button asChild size="lg" className="mt-10 bg-emerald-600 hover:bg-emerald-700">
              <TransitionLink href="/dashboard">Gestionar Libros</TransitionLink>
            </Button>
          </div>
        </section>

        <section id="caracteristicas" className="py-20">
          <div className="container">
            <h2 className="mb-12 text-center text-3xl font-bold">Características Principales</h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="rounded-lg border p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                  <BookOpen className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="mb-2 text-xl font-medium">Organiza tu Biblioteca</h3>
                <p className="text-sm text-muted-foreground">
                  Cataloga todos tus libros con detalles como título, autor y más.
                </p>
              </div>
              <div className="rounded-lg border p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-emerald-600"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-medium">Búsqueda Rápida</h3>
                <p className="text-sm text-muted-foreground">
                  Encuentra cualquier libro en segundos con nuestro potente buscador.
                </p>
              </div>
              <div className="rounded-lg border p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-emerald-600"
                  >
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-medium">Edición Sencilla</h3>
                <p className="text-sm text-muted-foreground">
                  Actualiza la información de tus libros con facilidad cuando lo necesites.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-emerald-600 py-16 text-white">
          <div className="container text-center">
            <h2 className="text-3xl font-bold">¿Listo para organizar tu colección?</h2>
            <Button asChild variant="outline" size="lg" className="mt-8 bg-white text-emerald-600 hover:bg-emerald-50">
              <TransitionLink href="/dashboard">Comenzar Ahora</TransitionLink>
            </Button>
          </div>
        </section>
      </main>
      <footer className="border-t py-6">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-emerald-600" />
            <span className="text-sm font-medium">Biblio App</span>
          </div>
          <p className="text-xs text-muted-foreground">© Daniel Trejos - 2025. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
