
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password } = req.body;

  // Verifica as credenciais no localStorage
  const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
  const user = existingUsers.find((user: { email: string; password: string }) => user.email === email && user.password === password);

  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Simula a criação de uma sessão
  sessionStorage.setItem('currentUser', JSON.stringify(user));
  document.cookie = `currentUser=${JSON.stringify(user)}; path=/; max-age=3600;`; // Set cookie

  res.status(200).json({ message: 'Login successful' });
}
