
export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface TreeNode {
  name: string;
  type?: 'ude' | 'injection' | 'stable';
  children?: TreeNode[];
}

export interface ConflictCloudData {
  objective: string;
  requirements: { b: string; c: string };
  prerequisites: { d: string; dPrime: string };
}

export interface SystemModule {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
}
