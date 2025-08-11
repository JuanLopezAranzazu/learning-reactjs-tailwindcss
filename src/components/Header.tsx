import { useState } from "react";
import { Link } from "react-router-dom";
import { LuMoon, LuSun, LuFolder, LuPlus, LuMenu, LuX } from "react-icons/lu";
import IconButton from "./ui/IconButton";
import { useTheme } from "../hooks/useTheme";

const MENU_ITEMS = [
  {
    label: "Proyectos",
    path: "/",
    icon: <LuFolder className="w-4 h-4" />,
  },
  {
    label: "Crear Proyecto",
    path: "/projects/create",
    icon: <LuPlus className="w-4 h-4" />,
  },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="fixed top-0 left-0 w-full z-40 shadow-lg bg-white/70 dark:bg-zinc-900/70 backdrop-blur-lg">
      <nav className="flex items-center justify-between p-4 container mx-auto h-16">
        <h1 className="text-xl font-bold">My App</h1>

        <div className="hidden md:flex space-x-8">
          {MENU_ITEMS.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className="flex items-center gap-2 p-2 rounded-full hover:bg-zinc-300 dark:hover:bg-zinc-600"
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <IconButton onClick={toggleTheme} ariaLabel="Cambiar tema">
            {theme === "dark" ? (
              <LuSun className="w-4 h-4" />
            ) : (
              <LuMoon className="w-4 h-4" />
            )}
          </IconButton>

          <IconButton
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            ariaLabel="Abrir menú"
            className="md:hidden z-50"
          >
            {isMenuOpen ? (
              <LuX className="w-4 h-4" />
            ) : (
              <LuMenu className="w-4 h-4" />
            )}
          </IconButton>
        </div>

        {isMenuOpen && (
          <div className="fixed top-0 left-0 w-full z-40 bg-white/90 dark:bg-zinc-900/90 md:hidden flex items-center justify-center h-screen">
            <div className="flex flex-col space-y-4 text-xl">
              {MENU_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  className="flex items-center gap-2 p-2 rounded-full hover:bg-zinc-300 dark:hover:bg-zinc-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
