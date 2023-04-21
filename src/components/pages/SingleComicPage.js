import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import useMarvelService from '../../services/marvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import AppBanner from "../appBanner/AppBanner";

import './singleComicPage.scss';

const SingleComicPage = () => {

    const {comicId} = useParams();
    const a = useParams();
    console.log(a);
    const [comic, setComic] = useState(null);
    const {loading, error, getComic, clearError} = useMarvelService();

    useEffect(() => {
        updateComic(comicId);
    }, [comicId]);

    const updateComic = () => {
        clearError();
        getComic(comicId)
            .then(onComicLoaded)
    }  

    const onComicLoaded = (comic) => {
        setComic(comic);
    }

    const errorMessage = error?<ErrorMessage/>:null;
    const isLoading = loading?<Spinner/>:null;
    const content = (loading || error || !comic) ? null:<View comic={comic}/>;

    return (
        <>
            <AppBanner/>
            {errorMessage}
            {isLoading}
            {content}
        </>
    )
}

const View = ({comic}) => {
    const {thumbnail, description, title, price, language, pageCount} = comic;
    return(
        <div className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </div>
    );
   }

export default SingleComicPage;