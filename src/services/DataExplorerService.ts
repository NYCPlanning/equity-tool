import axios, { AxiosInstance } from "axios";
import { Geography } from "@constants/geography";
import { Category } from "@constants/Category";
import { CategoryProfile } from "@schemas/tableSchema";

export class DataExplorerService {
  client: AxiosInstance;

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
    });
  }

  async get(geography: Geography, geoid: string, category: Category) {
    const path = `${geography}_${geoid}_${category}.json`;
    return this.client.get<CategoryProfile>(path);
  }
}
