import apiClient from './axios';

export async function getMovies() {
  const response = await apiClient.get('/movies');
  return response.data.data;
}

export async function getMovieById(id) {
  const response = await apiClient.get(`/movies/${id}`);
  return response.data.data;
}
