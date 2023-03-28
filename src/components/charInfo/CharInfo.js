import './charInfo.scss';
import { useState, useEffect } from 'react';
import useMarvelService from '../../services/marvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';
import PropTypes from 'prop-types';

const CharInfo = (props) => {
    

    const [char, setChar] = useState(null);

    const {getOneCharacter, loading, error, clearError} = useMarvelService();


    useEffect(() => {
        updateChar();
    }, [props.charId])



    const updateChar = () => {
        const {charId} = props;
        if (!charId) {
            return;
        }

        clearError();
        getOneCharacter(charId)
            .then(onCharLoaded)
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }


        const skeleton = (char || loading || error)? null : <Skeleton/>;
        const isLoading =  loading? <Spinner/>: null;
        const isError =  error? <ErrorMessage/>: null;
        const finalElements = !(isLoading || isError || !char)? <View char={char}/> : null;
        return (
            <div className="char__info">
                {skeleton}
                {isLoading}
                {isError}
                {finalElements}
            </div>
        )


}

const imgStyle = (item) => {
    let style = {'objectFit' : 'cover'};
        if (item === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
            style = {'objectFit' : 'unset'};
        }
    return style;
}

const View = (char) => {
    const {char : {name, thumbnail, homepage, wiki, description, comics}}  = char;
    return(
        <>
            <div className="char__basics">
                <img src={thumbnail} alt="abyss" style = {imgStyle(thumbnail)}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">Homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0? null:'There are no comics for this character'}  
                {
                    comics.map((item, i) => {
                        if (i < 10) 
                            return (
                                <li key = {i} className='char__comics-item'>{item.name}</li>
                            );
                        else 
                        // eslint-disable-next-line
                            return;
                        })
                } 
            </ul>
        </>
    );

}

CharInfo.propTypes = {
    charId: PropTypes.number
}


export default CharInfo;