import { SWApiService } from "./swapi-service";

export type { Character, GetCharactersResponse} from "./swapi-service.types";
export const swApiService = new SWApiService();