import {useHttp} from '../hooks/http.hook';

const useMarvelService = () => {

    const {loading, request, error, clearError} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=b454382065c15ed26e70f54950a07f34';
    const _baseOffset = 210;


    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(item => _transformCharacterAll(item));
    }
    const getOneCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`)
        return _transformCharacter(res.data.results[0]);
    }
    const getAllComics = async(offset = _baseOffset) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(item => _transformAllComicsData(item));
    }

    const _transformCharacter = (res) => {
        return {
            name: res.name,
            description: res.description?`${res.description.slice(0,180)}...`:`Description is not found`,
            thumbnail: res.thumbnail.path + '.' +  res.thumbnail.extension,
            homepage: res.urls[0].url, 
            wiki: res.urls[1].url,
            comics: res.comics.items
        }
    }

    const _transformCharacterAll = (res) => {
        return {
            name: res.name,
            id: res.id,
            thumbnail: res.thumbnail.path + '.' +  res.thumbnail.extension
        }
    }

    const _transformAllComicsData = (res) => {
        return {
            id: res.id,
            title: res.title,
            price: res.prices.price,
            thumbnail: res.thumbnail.path + '.' +  res.thumbnail.extension
        }
    }

    return {loading, error, getAllCharacters, getOneCharacter, getAllComics, clearError}
}

export default useMarvelService;