class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=b454382065c15ed26e70f54950a07f34';
    _baseOffset = 210;

    getResource = async (url) => {
        try {
            let res = await fetch(url);
            if (!res.ok) {
                throw new Error(`Could not fetch ${url}, status ${res.status}`)
            }
            return await res.json();
        }
        catch(err) {
            console.error(err);
        } 
    }

    getAllCharacters = async (offset = this._baseOffset) => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`);
        return res.data.results.map(item => this._transformCharacterAll(item));
    }
     getOneCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`)
        return this._transformCharacter(res.data.results[0]);
    }

    _transformCharacter = (res) => {
        return {
            name: res.name,
            description: res.description?`${res.description.slice(0,180)}...`:`Description is not found`,
            thumbnail: res.thumbnail.path + '.' +  res.thumbnail.extension,
            homepage: res.urls[0].url, 
            wiki: res.urls[1].url,
            comics: res.comics.items
        }
    }
    _transformCharacterAll = (res) => {
        return {
            name: res.name,
            id: res.id,
            thumbnail: res.thumbnail.path + '.' +  res.thumbnail.extension
        }
    }
}

export default MarvelService;