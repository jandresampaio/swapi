import axios from "axios";
import { GetCharactersResponse } from "./swapi-service.types";


export class SWApiService  {
  HOST = "https://swapi.dev/api";

  async getCharacters({ search, pageUrl }: { search?: string, pageUrl?: string } = {}) {
    const path = pageUrl || this.HOST + "/people";
    const params = {};
    if (search) {
      params["search"] = search;
    }
    return await axios.get<GetCharactersResponse>(path, {
      params
    });
  } 
}