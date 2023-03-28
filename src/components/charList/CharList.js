import './charList.scss';
import useMarvelService from '../../services/marvelService';
import { useState, useEffect, useRef } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import PropTypes  from 'prop-types';
import React from 'react';



const CharList = (props) => {

    const itemRefs = useRef([]); 

    const [char, setChar] = useState([]),
          [newItemLodaing, setNewItemLodaing] = useState(false),
          [offset, setOffset] = useState(210),
          [charEnded, setCharEnded] = useState(false);

    const marvelService = useMarvelService();
    const {loading, error, getAllCharacters} = marvelService;

    const onFocus = (i) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_active'));
        itemRefs.current[i].classList.add('char__item_active');
        itemRefs.current[i].focus();
    }
    
    const setFocus = () => {
        itemRefs.current[itemRefs.current.length - 1].focus();
    }

    const onSelectedKey = (i) => {
        onFocus(i);
    }

    const onRequest = (offset, initial) => {
        initial ? setNewItemLodaing(false) : setNewItemLodaing(true);
        getAllCharacters(offset)
            .then(onAllCharLoaded);
    }

    useEffect(()=> {
        onRequest(offset, true);
    }, [])



    const onAllCharLoaded = (newChar) => {
        let ended = false;
        if(newChar.length < 9) {
            ended = true;
        }

            setChar(charlist => {
                return [...charlist, ...newChar];
            });
            setNewItemLodaing(false);
            setOffset(prev => prev + 9);
            setCharEnded(ended);

    }


    const charElements = char.map((item, i) => {
        let imgStyle = {'objectFit' : 'cover'};
        if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
            imgStyle = {'objectFit' : 'unset'};
        }
        return(
            <li 
            key = {item.id}
            tabIndex = "0" 
            onClick = {(e) => {
                props.onCharSelected(item.id);
                onFocus(i);
            }}
            onKeyDown = {(e) => {
                if(e.key === 'Enter') {
                    onSelectedKey(i)
                    props.onCharSelected(item.id);
                }
            }} 
            ref = {el => itemRefs.current[i] = el}
            className="char__item">
                <img src={item.thumbnail} style = {imgStyle} alt="abyss"/>
                <div className="char__name">{item.name}</div>
            </li>
        );
        
    })


    const isloading =  loading && !newItemLodaing ?<Spinner/>:null;
    const isError =  error?<ErrorMessage/>:null;
    //const finalElements = !(isloading || isError)?charElements:null;

    return (
        <div className="char__list">
            {isloading}
            {isError}
            <ul className="char__grid">
                {charElements}
            </ul>
            <button 
            className="button button__main button__long"
            disabled={newItemLodaing}
            style={{'display': charEnded?'none':'block'}}
            onClick={() => {
                onRequest(offset);
                setFocus();
            }}> 
                <div className="inner">load more</div>
            </button>
        </div>
        
    );
    
}
CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
};

export default CharList;