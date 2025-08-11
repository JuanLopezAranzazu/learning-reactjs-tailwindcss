export interface ProjectRequest {
  name: string;
  description: string;
}

export interface ProjectResponse {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
}
