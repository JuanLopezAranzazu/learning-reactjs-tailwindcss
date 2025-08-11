import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProjectForm from "../components/ProjectForm";
import type { ProjectRequest, ProjectResponse } from "../types";

interface ProjectEditProps {
  getProjectById: (id: string) => ProjectResponse | null;
  onUpdateProject: (id: string, data: ProjectRequest) => void;
}

const ProjectEdit = ({ getProjectById, onUpdateProject }: ProjectEditProps) => {
  const { id } = useParams<{ id: string }>();
  if (!id) {
    throw new Error("El ID del proyecto es obligatorio");
  }
  const [project, setProject] = useState<ProjectResponse | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const project = getProjectById(id);
    if (project) {
      setProject(project);
    }
  }, [id, getProjectById]);

  const handleUpdateProject = (data: ProjectRequest) => {
    onUpdateProject(id, data);
    navigate("/");
  };

  return (
    <>
      <ProjectForm initialData={project} onSubmit={handleUpdateProject} />
    </>
  );
};

export default ProjectEdit;
