import service from "./baseService";

export const gameService = {
  fetchGameGenres: (slug,pageNumber) => 
    service.get(`games?genres=${slug}&page=${pageNumber}`),
  
  
}
