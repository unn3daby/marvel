import './comicsList.scss';
import { useState, useEffect, useRef } from 'react';
import uw from '../../resources/img/UW.png';
import xMen from '../../resources/img/x-men.png';
import AppBanner from '../appBanner/AppBanner';
import useMarvelService from '../../services/marvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';



const ComicsList = (props) => {
    const [char, setChar] = useState([]);
    const [offset, setOffset] = useState(123);
    const [isCharacterEnded, setIsCharacterEnded] = useState(false);
    const [newItemLodaing, setNewItemLodaing] = useState(false);


    const {getAllComics, loading, error} = useMarvelService();

    const onRequest = (offset, initial) => {
        initial?setNewItemLodaing(false):setNewItemLodaing(true);
        getAllComics(offset)
            .then(onAllComicsLoaded)
    }

    const onAllComicsLoaded = (res) => {
        let checker = false;
        if (res.length < 8) {
            checker = true;
        }
        setChar(char => ([...char, ...res]));
        setNewItemLodaing(false);
        setOffset(offset => offset + 8);
        setIsCharacterEnded(checker);
    }

    const scrollFunc = () => {
        let fOffset = offset + 8;
        console.log('event')
        return () => {
            if(document.body.scrollHeight <= window.innerHeight + document.documentElement.scrollTop) {
                if(isCharacterEnded) {
                    window.removeEventListener('scroll', scrollFunc);
                }
                else if (loading) {
                    console.log('loading')
                }
                else {
                    onRequest(fOffset);
                    fOffset += 8;
                }
            }
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', scrollFunc());
        onRequest(offset, true);
        
        return () => {
            window.removeEventListener('scroll', scrollFunc());
        }
    }, [])


    const charElements = char.map((item,i) => {
        return(
            <li key = {i} className="comics__item">
                <a href="#">
                    <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
                    <div className="comics__item-name">{item.title}</div>
                    <div className="comics__item-price">{item.price}</div>
                </a>
            </li>
        );
    })

    const isloading = (loading && !newItemLodaing)?<Spinner/>:null;
    const isError = error?<ErrorMessage/>:null;
   
    return (
        <div className="comics__list">
           <AppBanner/>
           {isloading}
           {isError}
            <ul className="comics__grid">
                {charElements}
            </ul>
            <button  
                style={{'display': isCharacterEnded?'none':'block'}} 
                disabled = {newItemLodaing} 
                onClick={() => onRequest(offset)} 
                className="button button__main button__long">

                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;