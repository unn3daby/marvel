import './charList.scss';
import MarvelService from '../../services/marvelService';
import { Component } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import PropTypes  from 'prop-types';
import React from 'react';



class CharList extends Component {
    state = {
        char: [],
        loading: true,
        error: false,
        newItemLodaing: false,
        offset: 210,
        charEnded: false
    }
    itemRefs = [];

    setRef = (ref) => {
        this.itemRefs.push(ref);
    } 

    onFocus = (i) => {
        this.itemRefs.forEach(item => item.classList.remove('char__item_active'));
        this.itemRefs[i].classList.add('char__item_active');
        this.itemRefs[i].focus();
    }
    setFocus = () => {
        this.itemRefs[this.itemRefs.length - 1].focus();
    }

    onSelectedKey = (i) => {
        this.onFocus(i);
    }


    marvelService = new MarvelService();

    onAllCharLoaded = (newChar) => {
        let ended = false;
        if(newChar.length < 9) {
            ended = true;
        }
        this.setState(({char, offset}) => ({
            char: [...char, ...newChar],
            loading: false,
            error: false,
            newItemLodaing: false,
            offset: offset + 9,
            charEnded: ended
        }))
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }

    onCharListLoading = () => {
        this.setState({
            newItemLodaing: true
        });
    }

    onRequest = (offset) => {
        this.onCharListLoading();
        this.marvelService.getAllCharacters(offset)
            .then(this.onAllCharLoaded)
            .catch(this.onError);
    }

    componentDidMount() {
        this.onRequest();
        console.log(this.itemRefs, 'didmount');
    }



    render() {
        const {char, loading, error, offset, newItemLodaing, charEnded} = this.state;

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
                    this.props.onCharSelected(item.id);
                    this.onFocus(i);
                }}
                onKeyDown = {(e) => {
                    if(e.key === 'Enter')
                    {this.onSelectedKey(i)
                    this.props.onCharSelected(item.id);}
                }} 
                ref = {this.setRef}
                className="char__item">
                    <img src={item.thumbnail} style = {imgStyle} alt="abyss"/>
                    <div className="char__name">{item.name}</div>
                </li>
            );
        })
        const isloading =  loading?<Spinner/>:null;
        const isError =  error?<ErrorMessage/>:null;
        const finalElements = !(isloading || isError)?charElements:null;
        return (
            <div className="char__list">
                {isloading}
                {isError}
                <ul className="char__grid">
                {finalElements}
                </ul>
                <button 
                className="button button__main button__long"
                disabled={newItemLodaing}
                style={{'display': charEnded?'none':'block'}}
                onClick={() => {
                    this.onRequest(offset);
                    this.setFocus();
                }}> 
                    <div className="inner">load more</div>
                </button>
            </div>
            
        )
    }
}
CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
};

export default CharList;