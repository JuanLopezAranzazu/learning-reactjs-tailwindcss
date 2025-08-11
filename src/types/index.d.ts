export interface ProjectRequest {
  name: string;
  description: string;
  tags: string[];
}

export interface ProjectResponse {
  id: string;
  name: string;
  description: string;
  tags: string[];
  createdAt: Date;
}
