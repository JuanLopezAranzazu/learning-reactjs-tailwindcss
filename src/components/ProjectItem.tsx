import type { ProjectResponse } from "../types";
import { LuPencil, LuTrash } from "react-icons/lu";
import Button from "./ui/Button";

interface ProjectItemProps {
  project: ProjectResponse;
  onEditProject: (id: string) => void;
  onDeleteProject: (id: string) => void;
}

const ProjectItem = ({
  project,
  onEditProject,
  onDeleteProject,
}: ProjectItemProps) => {
  const formattedDate = new Date(project.createdAt).toLocaleDateString(
    "es-ES",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <div
      className="
        glass p-6 rounded-xl border border-zinc-200 dark:border-zinc-700
        hover:-translate-y-1 hover:border-blue-500/30
        hover:shadow-[0_4px_20px_rgba(59,130,246,0.1)]
        transition-all flex flex-col 
      "
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-bold">{project.name}</h3>
        <span className="text-xs text-gray-400">Creado el {formattedDate}</span>
      </div>

      <p className="text-gray-400 mb-4 break-words whitespace-normal">
        {project.description?.length > 120
          ? `${project.description.slice(0, 120)}...`
          : project.description || "Sin descripción disponible"}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.map((tag, key) => (
          <span
            key={key}
            className="
              bg-blue-500/10 text-blue-500 py-1 px-3 
              rounded-full text-sm
              transition
              hover:bg-blue-500/20 hover:-translate-y-0.5
              hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)]
            "
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex gap-3 pt-4">
        <Button
          variant="primary"
          onClick={() => onEditProject(project.id)}
          className="flex items-center gap-2"
        >
          <LuPencil className="w-4 h-4" /> Editar
        </Button>

        <Button
          variant="danger"
          onClick={() => onDeleteProject(project.id)}
          className="flex items-center gap-2"
        >
          <LuTrash className="w-4 h-4" /> Eliminar
        </Button>
      </div>
    </div>
  );
};

export default ProjectItem;
