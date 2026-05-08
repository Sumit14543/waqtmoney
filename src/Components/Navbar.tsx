import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const links = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/Services" },
    { name: "Faqs", path: "/Faqs" },
    { name: "EMI Calculator", path: "/Emi-Calculator" },
    { name: "Policies", path: "/Policies" },
    { name: "About", path: "/About" },
    { name: "Contact", path: "/Contact" },
  ];

  const renderLinks = (isMobile = false) =>
    links.map((link) => {
      const isActive = location.pathname === link.path;

      return (
        <Link
          key={link.name}
          to={link.path}
          onClick={() => setIsOpen(false)}
          className={`relative ${
            isMobile
              ? `block py-3 px-2 rounded-md text-base font-medium transition ${
                  isActive
                    ? "bg-purple-50 text-purple-600 font-semibold"
                    : "text-muted-foreground hover:bg-gray-100"
                }`
              : `text-sm font-medium transition ${
                  isActive
                    ? "text-purple-600"
                    : "text-black hover:text-purple-600"
                }`
          }`}
        >
          {link.name}

          {!isMobile && (
            <span
              className={`absolute left-0 -bottom-1 h-[2px] bg-purple-600 transition-all duration-300 ${
                isActive ? "w-full" : "w-0 group-hover:w-full"
              }`}
            />
          )}
        </Link>
      );
    });

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">

        {/* Logo */}
        <Link to="/">
          <img
            src="/waqt-money-logo-img.png"
            className="w-40 md:w-48 h-auto object-contain"
            alt="waqt-logo"
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {renderLinks(false)}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link to="/login">
            <Button variant="ghost" size="sm">
              Log In
            </Button>
          </Link>
          <Link to="/user/apply">
            <Button className="bg-purple-600 text-white hover:bg-purple-700">
              Apply Now
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-gray-100 transition"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white border-t border-border transition-all duration-300 ${
          isOpen ? "max-h-[500px] py-4" : "max-h-0 overflow-hidden"
        }`}
      >
        <div className="px-4 space-y-1">
          {renderLinks(true)}

          {/* Buttons */}
          <div className="flex flex-col gap-3 pt-4">
            <Link to="/login" onClick={() => setIsOpen(false)}>
              <Button
                variant="outline"
                className="w-full h-11 text-base"
              >
                Log In
              </Button>
            </Link>

            <Link to="/user/apply" onClick={() => setIsOpen(false)}>
              <Button
                className="w-full h-11 text-base bg-purple-600 text-white hover:bg-purple-700"
              >
                Apply Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
