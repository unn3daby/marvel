import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import { useState } from "react";
import decoration from '../../resources/img/vision.png';
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import ComicsList from "../comicsList/ComicsList";

const App = () => {

    const [selectedChar, setChar] = useState(null);

    const onCharSelected = (id) => {
        console.log('on char selected')
        setChar(id);
    }

    return (
        <div className="app">
            <AppHeader/>
            {/* <ErrorBoundary>
                <RandomChar/>
            </ErrorBoundary>
            <main>
                <div className="char__content">
                    <ErrorBoundary>
                        <CharList onCharSelected = {onCharSelected}/>
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharInfo charId={selectedChar}/>
                    </ErrorBoundary>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision"/>
            </main> */}
            <ComicsList/>
        </div>
    );

}

export default App;