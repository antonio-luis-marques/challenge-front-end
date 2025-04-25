
interface TypeData {
  name: string;
  email: string;
}

export interface CredencialType {
  dataUser: TypeData;
  expiration?: Date;
}

const nameStorage = 'dataUser';

class UserStorage {
  static async register(dataUser: CredencialType): Promise<void> {
    try {
      const validatedData = this.validateData(dataUser);
      if (validatedData) {
        localStorage.setItem(nameStorage, JSON.stringify(validatedData));
        this.session(validatedData)
      } else {
        throw new Error('Dados de usuário inválidos');
      }
    } catch (error) {
      console.error('Erro ao registrar os dados:', error);
    }
  }

  static async login(email: string): Promise<CredencialType | null> {
    try {
      const result = localStorage.getItem(nameStorage);
      if (result) {
        const data: CredencialType = JSON.parse(result);
        if (data.dataUser.email === email) {
          this.session(data)
          return data;
        } else {
          console.warn('Credenciais inválidas');
          return null;
        }
      }
      return null;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      return null;
    }
  }

  private static session(dataUser: CredencialType): void {
    sessionStorage.setItem(nameStorage, JSON.stringify(dataUser));
  }

  private static validateData(dataUser: CredencialType): CredencialType | null {
    const { name, email } = dataUser.dataUser;
    if (name && email) {
      return dataUser;
    }
    return null;
  }

  static isSessionExpired(): boolean {
    const result = sessionStorage.getItem(nameStorage);
    if (result) {
      const dataUser: CredencialType = JSON.parse(result);
      if (!dataUser.expiration) return false;

      const now = new Date();

      return now > new Date(dataUser.expiration);
    }
    return false
  }
}

export default UserStorage;
