import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div
      className="
    flex flex-col min-h-screen 
    bg-white dark:bg-zinc-800 
    text-zinc-800 dark:text-white
    "
    >
      <Header />
      <main className="flex-1 container mx-auto mt-16 p-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
