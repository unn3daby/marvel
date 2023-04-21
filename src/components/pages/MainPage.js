import { useState } from "react";

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import decoration from '../../resources/img/vision.png';
import CharDynamic from "../CharDynamic/CharDynamic";

const MainPage = () => {
    
    const [selectedChar, setChar] = useState(null);
    const onCharSelected = (id) => {
        console.log('on char selected')
        setChar(id);
    }
    return(
        <>
             <ErrorBoundary>
                <RandomChar/>
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary>
                    <CharList onCharSelected = {onCharSelected}/>
                </ErrorBoundary>
                <ErrorBoundary>
                    <CharDynamic charId={selectedChar}/>
                </ErrorBoundary>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>

        </>
    )
}
export default MainPage;