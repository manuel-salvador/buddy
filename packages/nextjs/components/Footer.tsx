"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  if (pathname === "/debug") return null;
  return (
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
      <p className="text-xs text-muted-foreground">&copy; 2024 Budy. Todos los derechos reservados.</p>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        <Link href="#" className="text-xs hover:underline underline-offset-4 text-muted-foreground" prefetch={false}>
          Términos de servicio
        </Link>
        <Link href="#" className="text-xs hover:underline underline-offset-4 text-muted-foreground" prefetch={false}>
          Privacidad
        </Link>
      </nav>
    </footer>
  );
}
