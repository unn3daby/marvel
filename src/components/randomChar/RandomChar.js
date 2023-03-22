import { Component } from 'react';
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import MarvelService from '../../services/marvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

class RandomChar extends Component {

    state = {
        char: {},
        loading: true,
        error: false
    }

    marvelService = new MarvelService();

    onCharLoaded = (char) => {
        this.setState({
            char, 
            loading: false,
            error: false
        });
    }

    updateChar = (id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)) => {
        this.marvelService
            .getOneCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }
    componentDidMount() {
        this.updateChar();
    }
    componentDidUpdate() {
       // this.updateChar();
    }
    updateCharButton() {
        this.setState({
            loading: true,
            error: false
        })
        this.updateChar();
    }
    static imgStyle = (item) => {
        let style = {'objectFit' : 'cover'};
            if (item === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                style = {'objectFit' : 'unset'};
            }
        return style;
    }


   
    render() {
        const {char, loading, error} = this.state;
        const errorMessage = error?<ErrorMessage/>:null;
        const spinner = loading?<Spinner/>:null;
        const content = !(loading || error)? <View char={char}/> : null;
        return (
            <div className="randomchar">
                {errorMessage}
                {spinner}
                {content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main">
                        <div className="inner" onClick={() => this.updateCharButton()}>try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}

const View = ({char}) => {
    const {name, description, homepage, wiki, thumbnail} = char;
    let imgStyle = RandomChar.imgStyle(thumbnail);
    return(
        <div className="randomchar__block">
                    <img src={thumbnail} alt="Random character" className="randomchar__img" style={imgStyle}/>
                    <div className="randomchar__info">
                        <p className="randomchar__name">{name}</p>
                        <p className="randomchar__descr">
                            {description}
                        </p>
                        <div className="randomchar__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">wiki</div>
                            </a>    
                        </div>
                    </div>
                </div>
    );
}

export default RandomChar;