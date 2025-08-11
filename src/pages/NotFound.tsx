import { useNavigate } from "react-router-dom";
import { LuHouse } from "react-icons/lu";
import Button from "../components/ui/Button";

const NotFound = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-6xl font-extrabold text-blue-600 mb-4">404</h1>
      <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-6">
        Oops! La página que buscas no existe o fue movida.
      </p>

      <Button
        variant="primary"
        onClick={goToHome}
        className="flex items-center gap-2"
      >
        <LuHouse className="w-4 h-4" />
        Volver al inicio
      </Button>
    </section>
  );
};

export default NotFound;
