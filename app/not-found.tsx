import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="text-5xl font-bold tracking-tight">404</h1>

      <p className="mt-2 text-lg font-medium">
        Page not found
      </p>

      <p className="mt-4 max-w-md text-muted-foreground">
        The page you are looking for may have been moved, deleted, or does not exist.
      </p>

      <div className="mt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <ArrowLeft className="h-4 w-4" />
          Return to dashboard
        </Link>
      </div>

      <footer className="mt-12 max-w-md text-sm text-muted-foreground">
        If you believe this is an error, please contact support or try again later.
      </footer>
    </div>
  );
}
