import { users, logoRequests, type User, type InsertUser, type LogoRequest, type InsertLogoRequest, type GeneratedLogo } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createLogoRequest(request: InsertLogoRequest): Promise<LogoRequest>;
  getLogoRequest(id: number): Promise<LogoRequest | undefined>;
  updateLogoRequestWithResults(id: number, logos: GeneratedLogo[]): Promise<LogoRequest | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private logoRequests: Map<number, LogoRequest>;
  private currentUserId: number;
  private currentLogoRequestId: number;

  constructor() {
    this.users = new Map();
    this.logoRequests = new Map();
    this.currentUserId = 1;
    this.currentLogoRequestId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createLogoRequest(insertRequest: InsertLogoRequest): Promise<LogoRequest> {
    const id = this.currentLogoRequestId++;
    const request: LogoRequest = {
      ...insertRequest,
      id,
      tagline: insertRequest.tagline || null,
      color: insertRequest.color || null,
      audience: insertRequest.audience || null,
      requirements: insertRequest.requirements || null,
      generatedLogos: null,
      createdAt: new Date().toISOString(),
    };
    this.logoRequests.set(id, request);
    return request;
  }

  async getLogoRequest(id: number): Promise<LogoRequest | undefined> {
    return this.logoRequests.get(id);
  }

  async updateLogoRequestWithResults(id: number, logos: GeneratedLogo[]): Promise<LogoRequest | undefined> {
    const request = this.logoRequests.get(id);
    if (!request) return undefined;

    const updatedRequest: LogoRequest = {
      ...request,
      generatedLogos: logos,
    };
    this.logoRequests.set(id, updatedRequest);
    return updatedRequest;
  }
}

export const storage = new MemStorage();
