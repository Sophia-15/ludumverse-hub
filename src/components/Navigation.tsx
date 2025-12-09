import { Button } from "@/components/ui/button";
import { Gamepad2, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "@/contexts/AuthContext";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthContext();

  // Links públicos (apenas para visitantes)
  const publicLinks = [
    { label: "Catálogo", href: "/catalogo" },
    { label: "Crowdfunding", href: "/crowdfunding" },
  ];

  // Links ficam visíveis, mas somente alguns para visitantes
  const navLinks = publicLinks;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Gamepad2 className="w-8 h-8 text-primary-glow" />
            <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Ludum
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={link.href}
                className="text-muted-foreground hover:text-foreground transition-smooth"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <Button variant="secondary" onClick={() => navigate("/painel")}>
                  Meu Painel
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" onClick={() => navigate("/auth")}>
                  Entrar
                </Button>
                <Button variant="hero" onClick={() => navigate("/auth")}>
                  Cadastrar
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-border/50">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={link.href}
                className="block text-muted-foreground hover:text-foreground transition-smooth py-2"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-4">
              {isAuthenticated ? (
                <Button variant="secondary" onClick={() => { navigate("/painel"); setIsOpen(false); }} className="w-full">
                  Meu Painel
                </Button>
              ) : (
                <>
                  <Button variant="ghost" onClick={() => { navigate("/auth"); setIsOpen(false); }} className="w-full">
                    Entrar
                  </Button>
                  <Button variant="hero" onClick={() => { navigate("/auth"); setIsOpen(false); }} className="w-full">
                    Cadastrar
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
