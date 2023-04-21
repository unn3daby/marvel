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
    const getComic = async(id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformAllComicsData(res.data.results[0]);
    }
    const findChar = async(name) => {
        const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const _transformCharacter = (res) => {
        if(res != null)
        return {
            name: res.name,
            description: res.description?`${res.description.slice(0,180)}...`:`Description is not found`,
            thumbnail: res.thumbnail.path + '.' +  res.thumbnail.extension,
            homepage: res.urls[0].url, 
            wiki: res.urls[1].url,
            comics: res.comics.items
        }
        else {
            return null
        }

    }

    const _transformCharacterAll = (res) => {
        return {
            name: res.name,
            id: res.id,
            thumbnail: res.thumbnail.path + '.' +  res.thumbnail.extension
        }
    }

    const _transformAllComicsData = (comics) => {
		return {
			id: comics.id,
			title: comics.title,
			description: comics.description || "There is no description",
			pageCount: comics.pageCount
				? `${comics.pageCount} p.`
				: "No information about the number of pages",
			thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
			language: comics.textObjects[0]?.language || "en-us",
			price: comics.prices[0].price
				? `${comics.prices[0].price}$`
				: "not available",
		};
    }

    return {loading, error, getAllCharacters, getOneCharacter, getAllComics, clearError, getComic, findChar}
}

export default useMarvelService;