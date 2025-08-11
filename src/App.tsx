import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Projects from "./pages/Projects";
import ProjectCreate from "./pages/ProjectCreate";
import ProjectEdit from "./pages/ProjectEdit";
import NotFound from "./pages/NotFound";
import type { ProjectRequest, ProjectResponse } from "./types";
import { v4 as uuidV4 } from "uuid";
import { useLocalStorage } from "./hooks/useLocalStorage";

const App = () => {
  const [projects, setProjects] = useLocalStorage<ProjectResponse[]>(
    "projects",
    []
  );

  // Obtener un proyecto por su id
  const getProjectById = (id: string) => {
    return projects.find((project) => project.id === id) || null;
  };

  // Crear proyecto
  const onCreateProject = ({ name, description }: ProjectRequest) => {
    setProjects((prevProjects) => [
      ...prevProjects,
      { id: uuidV4(), name, description, createdAt: new Date() },
    ]);
  };

  // Actualizar proyecto
  const onUpdateProject = (
    id: string,
    { name, description }: ProjectRequest
  ) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === id ? { ...project, name, description } : project
      )
    );
  };

  // Eliminar proyecto
  const onDeleteProject = (id: string) => {
    setProjects((prevProjects) =>
      prevProjects.filter((project) => project.id !== id)
    );
  };

  // Ordenar proyectos
  const onSortProjects = (criteria: "name" | "createdAt") => {
    setProjects((prevProjects) =>
      [...prevProjects].sort((a, b) => (a[criteria] > b[criteria] ? 1 : -1))
    );
  };

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <Projects
              projects={projects}
              onDeleteProject={onDeleteProject}
              onSortProjects={onSortProjects}
            />
          }
        />
        <Route
          path="projects/create"
          element={<ProjectCreate onCreateProject={onCreateProject} />}
        />
        <Route
          path="projects/edit/:id"
          element={
            <ProjectEdit
              getProjectById={getProjectById}
              onUpdateProject={onUpdateProject}
            />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
