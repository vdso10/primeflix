import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import api from '../../services/api'

import './filme.css'


function Filme() {

    const { id } = useParams()
    const navigate = useNavigate()
    const [filme, setFilme] = useState({})
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        async function loadFilme(){
            await api.get(`/movie/${id}`, {
                params:{
                    api_key: 'a9f5e385a9098327047eb76c1989b62e',
                    language: 'pt-BR',                    
                }
            })
            .then((response) => {
                setFilme(response.data)
                //console.log(response.data)
                setLoading(false)
            })
            .catch(() =>{

                console.log('Filme Não encontrado')
                navigate('/', { replace: true})
                return
            })
        }

        loadFilme()

        return () => {
            console.log('Componente desmontado!')
        }
    }, [navigate, id])


    function salvarFilme() {
        
        const minhaLista = localStorage.getItem('@primeflix')

        let filmesSalvos = JSON.parse(minhaLista) || []

        const hasFilme =filmesSalvos.some( (filmeSalvo) => filmeSalvo.id === filme.id )

        if(hasFilme){
            toast.warn('Este Filme ja esta na lista')
            return
        }

        filmesSalvos.push(filme)
        localStorage.setItem('@primeflix', JSON.stringify(filmesSalvos))
        toast.success('Filme salvo com sucesso!')
    }


    if(loading){
        return(
            <div className='detalhes-filme'>
                <h2>Carregando detalhes do filme...</h2>
            </div>
        )
    }


    return(
        <div className='detalhes-filme'>
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />

            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <span>Data de lançamento: {filme.release_date}</span>            

            <strong>Avaliação: {filme.vote_average} / 10</strong>

            <div className='area-buttons'>
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a target='blank' rel='external' href={`https://youtube.com.br/results?search_query=${filme.title} Trailer`}>
                        Trailer
                    </a>
                </button>

            </div>
        </div>
    )
}

export default Filme