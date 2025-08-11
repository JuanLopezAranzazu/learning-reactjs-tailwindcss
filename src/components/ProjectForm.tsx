import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LuCheck, LuX, LuPlus } from "react-icons/lu";
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
    tags: [],
  });
  const [newTag, setNewTag] = useState("");
  const [errors, setErrors] = useState<
    Partial<Record<keyof ProjectRequest, string>>
  >({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleAddTag = () => {
    const tag = newTag.trim();
    if (tag && !formData.tags.includes(tag)) {
      setFormData((prev) => ({ ...prev, tags: [...prev.tags, tag] }));
    }
    setNewTag("");
  };

  const handleRemoveTag = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
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

      <div className="mt-4">
        <label className="block text-sm font-medium mb-1">Tags</label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && (e.preventDefault(), handleAddTag())
            }
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-300"
            placeholder="Escribe un tag y presiona Enter"
          />
          <Button
            type="button"
            variant="secondary"
            onClick={handleAddTag}
            className="flex items-center gap-2"
          >
            <LuPlus className="w-4 h-4" />
            Agregar
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {formData.tags.map((tag) => (
            <span
              key={tag}
              className="
              bg-blue-500/10 text-blue-500 py-1 px-3 
              rounded-full text-sm
              transition
              hover:bg-blue-500/20
              hover:shadow-[0_2px_8px_rgba(59,130,246,0. flex items-center gap-1
              "
            >
              {tag}
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                className="ml-1 p-1 hover:bg-blue-500/20 rounded-full cursor-pointer"
                aria-label={`Eliminar tag ${tag}`}
              >
                <LuX className="w-4 h-4" />
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="flex gap-2 mt-4 justify-end">
        <Button type="button" variant="secondary" onClick={() => navigate(-1)}>
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
