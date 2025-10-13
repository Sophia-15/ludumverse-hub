import { Button } from "@/components/ui/button";
import { Gamepad2, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "Catálogo", href: "/catalogo" },
    { label: "Biblioteca", href: "/biblioteca" },
    { label: "Crowdfunding", href: "/crowdfunding" },
    { label: "Mods", href: "/mods" },
    { label: "Comunidade", href: "/comunidade" },
    { label: "Carteira", href: "/carteira" },
  ];

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
            <Button variant="ghost">Entrar</Button>
            <Button variant="hero">Cadastrar</Button>
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
              <Button variant="ghost" className="w-full">Entrar</Button>
              <Button variant="hero" className="w-full">Cadastrar</Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
