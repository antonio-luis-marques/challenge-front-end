export interface UserData {
    name: string;
    email: string;
    password: string;
  }
  
  const STORAGE_KEY = 'users';
  
  export class UserStorage {
    static register(user: UserData): boolean {
      if (typeof window === 'undefined') return false;
  
      const users: UserData[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  
      const alreadyExists = users.some(u => u.email === user.email);
      if (alreadyExists) return false;
  
      users.push(user);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
      return true;
    }
  
    static login(email: string, password: string): UserData | null {
      if (typeof window === 'undefined') return null;
  
      const users: UserData[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      const user = users.find(u => u.email === email && u.password === password);
  
      return user || null;
    }
  
    static logout() {
      if (typeof window === 'undefined') return;
      localStorage.removeItem('currentUser');
    }
  
    static setSession(user: UserData) {
      if (typeof window === 'undefined') return;
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
  
    static getSession(): UserData | null {
      if (typeof window === 'undefined') return null;
      const user = localStorage.getItem('currentUser');
      return user ? JSON.parse(user) : null;
    }
  }
  