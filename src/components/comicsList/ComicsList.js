import './comicsList.scss';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import AppBanner from '../appBanner/AppBanner';
import useMarvelService from '../../services/marvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';



const ComicsList = (props) => {
    const [char, setChar] = useState([]);
    const [offset, setOffset] = useState(134);
    const [isCharacterEnded, setIsCharacterEnded] = useState(false);
    const [newItemLodaing, setNewItemLodaing] = useState(false);

    const {getAllComics, loading, error, clearError} = useMarvelService();

    const offsetRef = useRef(offset);

    useEffect(() => {
        offsetRef.current = offset;
      }, [offset]);

    const onRequest = (offset, initial) => {
        initial?setNewItemLodaing(false):setNewItemLodaing(true);
        clearError();
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
        console.log('offset +=8')
        setOffset(offset => offset + 8);
        setIsCharacterEnded(checker);

    }

    const scrollFunc = () => {
        if(!newItemLodaing && !isCharacterEnded && document.body.scrollHeight - document.documentElement.clientHeight <= document.documentElement.scrollTop) {
            onRequest(offsetRef.current);
        }   
        if(isCharacterEnded) {
            window.removeEventListener('scroll', scrollFunc);
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', scrollFunc);
        onRequest(offset, true);
        
        return () => {
            window.removeEventListener('scroll', scrollFunc);
        }
    }, [])


    const comicsElements = char.map((item,i) => {
        return(
            <CSSTransition classNames = 'comic' timeout = {600} key = {i}>
                <li  className="comics__item">
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}$</div>
                    </Link>
                </li>
            </CSSTransition>
        );
    })

    const isloading = (loading && !newItemLodaing)?<Spinner/>:null;
    const isError = error?<ErrorMessage/>:null;
   
    return (
        <div className="comics__list">
           <AppBanner/>
           {isloading}
           {isError}
            <ul className='comics__grid'>
                <TransitionGroup component={null}>
                        {comicsElements}
                </TransitionGroup>
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