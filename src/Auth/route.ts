
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const currentUser = JSON.parse(sessionStorage.getItem('currentUser') || 'null');

  if (!currentUser) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  res.status(200).json({ message: 'Welcome to the protected route!' });
}
