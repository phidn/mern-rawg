import service from "./baseService";
import axios from "axios";
import { TOKEN } from "../utils/constants";

export const gameService = {
  fetchGameGenres: (slug,pageNumber) => 
    service.get(`games?genres=${slug}&page=${pageNumber}`),
  fetchGameKeyword: (keyword,pageNumber=1) => 
    service.get(`games?page_size=20&search=${keyword}&page=${pageNumber}`),
  fetchGameLiked: () => {
    const token = localStorage.getItem(TOKEN);
    return axios({
      url: `/api/v1/video/like/getAll`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }      
    });
  },
  toggleLikeGame: (id) => {
    const token = localStorage.getItem(TOKEN);
    return axios({
      url: `/api/v1/video/like/${id}`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      }      
    });
  }
}
