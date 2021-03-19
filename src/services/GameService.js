import service from "./baseService";

export const gameService = {
  fetchGameGenres: (slug,pageNumber) => 
    service.get(`games?genres=${slug}&page=${pageNumber}`),
  fetchGameKeyword: (keyword,pageNumber=1) => 
    service.get(`games?page_size=20&search=${keyword}&page=${pageNumber}`),
}
