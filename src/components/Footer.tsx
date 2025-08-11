const Footer = () => {
  return (
    <footer className="shadow-inner bg-white/70 dark:bg-zinc-900/70">
      <div className="container mx-auto p-4">
        <p className="text-center">
          &copy; {new Date().getFullYear()} My App. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
