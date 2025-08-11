import ProjectItem from "./ProjectItem";
import type { ProjectResponse } from "../types";

interface ProjectListProps {
  projects: ProjectResponse[];
  onEditProject: (id: string) => void;
  onDeleteProject: (id: string) => void;
}

const ProjectList = ({
  projects,
  onEditProject,
  onDeleteProject,
}: ProjectListProps) => {
  
  if (projects.length === 0) {
    return (
      <p className="text-gray-500 dark:text-gray-400">
        No hay proyectos disponibles.
      </p>
    );
  }

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {projects.map(({ id, ...rest }) => (
        <li key={id}>
          <ProjectItem
            project={{ id, ...rest }}
            onEditProject={onEditProject}
            onDeleteProject={onDeleteProject}
          />
        </li>
      ))}
    </ul>
  );
};

export default ProjectList;
