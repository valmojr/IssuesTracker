export interface User {
  id: number;
  login: string;
  login_name: string;
  full_name: string;
  email: string;
  avatar_url: string;
  language: string;
  is_admin: boolean;
  last_login: string;
  created: string;
  restricted: boolean;
  active: boolean;
  prohibit_login: boolean;
  location: string;
  website: string;
  description: string;
  visibility: string;
  followers_count: number;
  following_count: number;
  starred_repos_count: number;
  username: string;
}

export interface Label {
  id: number;
  name: string;
  exclusive: boolean;
  color: string;
  description: string;
  url: string;
}

export interface Milestone {
  id: number;
  title: string;
  description: string;
  state: string;
  open_issues: number;
  closed_issues: number;
  created_at: string;
  updated_at: string;
  closed_at: string | null;
  due_on: string;
}

export interface Assignee {
  id: number;
  login: string;
  login_name: string;
  full_name: string;
  email: string;
  avatar_url: string;
  language: string;
  is_admin: boolean;
  last_login: string;
  created: string;
  restricted: boolean;
  active: boolean;
  prohibit_login: boolean;
  location: string;
  website: string;
  description: string;
  visibility: string;
  followers_count: number;
  following_count: number;
  starred_repos_count: number;
  username: string;
}

export interface Issue {
  id: number;
  url: string;
  html_url: string;
  number: number;
  user: User;
  original_author: string;
  original_author_id: number;
  title: string;
  body: string;
  ref: string;
  assets: any[];
  labels: Label[];
  milestone: Milestone;
  assignee: Assignee;
  assignees: Assignee[];
}
