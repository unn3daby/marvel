import './charInfo.scss';
import { Component } from 'react';
import MarvelService from '../../services/marvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';
import PropTypes from 'prop-types';

class CharInfo extends Component {
    
    state = {
        char: null,
        loading: false,
        error: false
    }

    MarvelService = new MarvelService();

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
            console.log('CharList updated')
        }
    }

    updateChar = () => {
        const {charId} = this.props;
        if(!charId) {
            return;
        }
        this.onCharLoading();
        this.MarvelService
            .getOneCharacter(charId)
            .then(this.onCharLoaded)
            .catch(this.onError)

    }

    onCharLoading() {
        this.setState({
            loading: true,
            error: false
        })
    }

    onCharLoaded = (char) => {
        this.setState({
            char, 
            loading: false,
            error: false
        });
    }
    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    static defaultProps = {
        charId: 110111
    }

    render() {
        const {char, loading, error} = this.state;
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