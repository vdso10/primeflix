import axios from 'axios'

//Base URL: https://api.themoviedb.org/3/
// URL API: /movie/now_playing?api_key=a9f5e385a9098327047eb76c1989b62e&language=pt-BR

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
})

export default api