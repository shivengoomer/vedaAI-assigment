// src/lib/api.ts
import { Assignment, CreateAssignmentDTO } from '@/types/assignment';

const BASE_URL = 'http://localhost:4000/api';

let globalToken: string | null = null;

export function setGlobalToken(token: string | null) {
  globalToken = token;
}

async function getAuthHeaders(): Promise<HeadersInit> {
  const headers: HeadersInit = {};
  let token = globalToken;

  if (!token && typeof window !== 'undefined') {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      token = await (window as any).Clerk?.session?.getToken() || null;
    } catch {}
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

async function authFetch(url: string, options: RequestInit = {}): Promise<Response> {
  const authHeaders = await getAuthHeaders();
  const headers = {
    ...authHeaders,
    ...options.headers,
  };
  return fetch(url, {
    ...options,
    headers,
  });
}

// Assignment API methods
export async function createAssignment(data: CreateAssignmentDTO): Promise<{ assignmentId: string; jobId: string }> {
  const formData = new FormData();
  formData.append('title', data.title);
  formData.append('subject', data.subject);
  formData.append('grade', data.grade);
  formData.append('dueDate', data.dueDate);
  formData.append('questionRows', JSON.stringify(data.questionRows));
  if (data.additionalInstructions) {
    formData.append('additionalInstructions', data.additionalInstructions);
  }
  if (data.file) {
    formData.append('file', data.file);
  }
  if (data.fileUrl) {
    formData.append('fileUrl', data.fileUrl);
  }

  const res = await authFetch(`${BASE_URL}/assignments`, {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) throw new Error('Failed to create assignment');
  return res.json();
}

export async function listAssignments(): Promise<Assignment[]> {
  const res = await authFetch(`${BASE_URL}/assignments`);
  if (!res.ok) throw new Error('Failed to fetch assignments');
  return res.json();
}

export async function getAssignment(id: string): Promise<Assignment> {
  const res = await authFetch(`${BASE_URL}/assignments/${id}`);
  if (!res.ok) throw new Error('Failed to fetch assignment details');
  return res.json();
}

export async function deleteAssignment(id: string): Promise<void> {
  const res = await authFetch(`${BASE_URL}/assignments/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete assignment');
}

export async function regenerateAssignment(id: string): Promise<{ jobId: string }> {
  const res = await authFetch(`${BASE_URL}/assignments/${id}/regenerate`, {
    method: 'POST',
  });
  if (!res.ok) throw new Error('Failed to regenerate assignment');
  return res.json();
}

export async function exportAssignmentPDF(id: string): Promise<Blob> {
  const res = await authFetch(`${BASE_URL}/assignments/${id}/export-pdf`);
  if (!res.ok) throw new Error('Failed to export PDF');
  return res.blob();
}

// Library API methods
export interface LibraryItem {
  _id: string;
  name: string;
  type: 'folder' | 'pdf' | 'doc';
  size?: string;
  category: string;
  url?: string;
  updatedAt: string;
}

export async function listLibraryItems(): Promise<LibraryItem[]> {
  const res = await authFetch(`${BASE_URL}/library`);
  if (!res.ok) throw new Error('Failed to fetch library items');
  return res.json();
}

export async function uploadLibraryItem(file: File, category: string): Promise<LibraryItem> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('category', category);

  const res = await authFetch(`${BASE_URL}/library`, {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) throw new Error('Failed to upload library item');
  return res.json();
}

export async function createLibraryFolder(name: string, category: string): Promise<LibraryItem> {
  const res = await authFetch(`${BASE_URL}/library/folder`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, category }),
  });
  if (!res.ok) throw new Error('Failed to create library folder');
  return res.json();
}

export async function deleteLibraryItem(id: string): Promise<void> {
  const res = await authFetch(`${BASE_URL}/library/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete library item');
}

// Notifications API methods
export async function listNotifications() {
  const res = await authFetch(`${BASE_URL}/notifications`);
  if (!res.ok) throw new Error('Failed to fetch notifications');
  return res.json();
}

export async function markNotificationAsRead(id: string) {
  const res = await authFetch(`${BASE_URL}/notifications/${id}/read`, {
    method: 'PATCH'
  });
  if (!res.ok) throw new Error('Failed to mark notification as read');
  return res.json();
}

export async function markAllNotificationsAsRead() {
  const res = await authFetch(`${BASE_URL}/notifications/mark-all-read`, {
    method: 'PATCH'
  });
  if (!res.ok) throw new Error('Failed to mark all as read');
  return res.json();
}

export async function deleteNotification(id: string) {
  const res = await authFetch(`${BASE_URL}/notifications/${id}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error('Failed to delete notification');
  return res.json();
}

export async function clearAllNotifications() {
  const res = await authFetch(`${BASE_URL}/notifications/clear-all`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error('Failed to clear notifications');
  return res.json();
}
