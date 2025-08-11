import { useNavigate } from "react-router-dom";
import ProjectForm from "../components/ProjectForm";
import type { ProjectRequest } from "../types";

interface ProjectCreateProps {
  onCreateProject: (data: ProjectRequest) => void;
}

const ProjectCreate = ({ onCreateProject }: ProjectCreateProps) => {
  const navigate = useNavigate();

  const handleCreateProject = (data: ProjectRequest) => {
    onCreateProject(data);
    navigate("/");
  };

  return (
    <>
      <ProjectForm onSubmit={handleCreateProject} />
    </>
  );
};

export default ProjectCreate;
