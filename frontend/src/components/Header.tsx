import { NavLink } from "@/components/NavLink";
import { BarChart3 } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-8 flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary">
            <BarChart3 className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            PulseCommerce
          </span>
        </div>
        <nav className="flex items-center gap-6 text-sm font-medium">
          <NavLink
            to="/"
            className="transition-colors hover:text-primary"
            activeClassName="text-primary font-semibold"
          >
            Inicio
          </NavLink>
          <NavLink
            to="/historic"
            className="transition-colors hover:text-primary"
            activeClassName="text-primary font-semibold"
          >
            Consumo Histórico
          </NavLink>
          <NavLink
            to="/predictive"
            className="transition-colors hover:text-primary"
            activeClassName="text-primary font-semibold"
          >
            Consumo Predictivo
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
