import { BookOpen } from "lucide-react"

export function DashboardFooter() {
  return (
    <footer className="border-t py-4 px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-primary" />
          <span className="text-xs font-medium">Biblio App</span>
        </div>
        <p className="text-xs text-muted-foreground">© Daniel Trejos - 2025. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}
