import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProjectList from "../components/ProjectList";
import type { ProjectResponse } from "../types";
import Button from "../components/ui/Button";
import SearchInput from "../components/ui/SearchInput";

interface ProjectsProps {
  projects: ProjectResponse[];
  onDeleteProject: (id: string) => void;
  onSortProjects: (criteria: "name" | "createdAt") => void;
}

const Projects = ({
  projects,
  onDeleteProject,
  onSortProjects,
}: ProjectsProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleEditProject = (id: string) => {
    navigate(`/projects/edit/${id}`);
  };

  // Filtrar proyectos por nombre
  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold">Lista de Proyectos</h1>

        <div className="flex gap-2">
          <SearchInput
            placeholder="Buscar proyecto..."
            name="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <Button variant="secondary" onClick={() => onSortProjects("name")}>
            Nombre
          </Button>
          <Button
            variant="secondary"
            onClick={() => onSortProjects("createdAt")}
          >
            Fecha
          </Button>
        </div>
      </div>

      <ProjectList
        projects={filteredProjects}
        onEditProject={handleEditProject}
        onDeleteProject={onDeleteProject}
      />
    </>
  );
};

export default Projects;
