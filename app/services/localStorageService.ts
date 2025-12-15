export class LocalStorageService {
  private static isAvailable(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  static get<T>(key: string, fallback: T): T {
    if (!this.isAvailable()) return fallback;

    try {
      const value = localStorage.getItem(key);
      return value ? (JSON.parse(value) as T) : fallback;
    } catch (e) {
      console.warn(`Failed to read localStorage key: ${key}`, e);
      return fallback;
    }
  }

  static set<T>(key: string, value: T): void {
    if (!this.isAvailable()) return;

    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn(`Failed to write localStorage key: ${key}`, e);
    }
  }

  static remove(key: string): void {
    if (!this.isAvailable()) return;

    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.warn(`Failed to remove localStorage key: ${key}`, e);
    }
  }
}
