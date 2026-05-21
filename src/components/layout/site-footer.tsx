import Link from "next/link";

import { Logo } from "@/components/shared/logo";
import { siteConfig } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 py-8 container-px md:flex-row md:items-center md:justify-between">
        <Logo />
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
          {siteConfig.navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
