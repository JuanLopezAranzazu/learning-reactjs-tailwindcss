import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LuCheck } from "react-icons/lu";
import type { ProjectRequest } from "../types";
import Button from "./ui/Button";
import Input from "./ui/Input";
import TextArea from "./ui/TextArea";

interface ProjectFormProps {
  initialData?: ProjectRequest | null;
  onSubmit: (data: ProjectRequest) => void;
}

const ProjectForm = ({ initialData = null, onSubmit }: ProjectFormProps) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ProjectRequest>({
    name: "",
    description: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof ProjectRequest, string>>
  >({
    name: "",
    description: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validate = () => {
    const newErrors: Partial<Record<keyof ProjectRequest, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es obligatorio";
    } else if (formData.name.length < 3) {
      newErrors.name = "El nombre debe tener al menos 3 caracteres";
    }

    if (!formData.description.trim()) {
      newErrors.description = "La descripción es obligatoria";
    } else if (formData.description.length < 10) {
      newErrors.description =
        "La descripción debe tener al menos 10 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;

    onSubmit(formData);
  };

  const goToBack = () => {
    navigate(-1);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-md space-y-4 w-full max-w-md mx-auto border border-zinc-200 dark:border-zinc-700"
    >
      <h1 className="text-2xl font-bold">
        {initialData ? "Editar Proyecto" : "Crear Proyecto"}
      </h1>

      <Input
        label="Nombre"
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
      />

      <TextArea
        label="Descripción"
        name="description"
        value={formData.description}
        onChange={handleChange}
        error={errors.description}
        rows={6}
      />

      <div className="flex gap-2 mt-4 justify-end">
        <Button type="button" variant="secondary" onClick={goToBack}>
          Volver
        </Button>
        <Button
          type="submit"
          variant="primary"
          className="flex items-center gap-2"
        >
          <LuCheck className="w-4 h-4" />
          {initialData ? "Actualizar" : "Crear"}
        </Button>
      </div>
    </form>
  );
};

export default ProjectForm;
