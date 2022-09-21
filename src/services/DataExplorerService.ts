import axios, { AxiosInstance } from "axios";
import { CategoryProfile } from "@schemas/categoryProfile";

export class DataExplorerService {
  client: AxiosInstance;

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
    });
  }

  async get(geography: string, geoid: string, category: string) {
    const path = `${geography}_${geoid}_${category}.json`;
    return this.client.get<CategoryProfile>(path);
  }
}
