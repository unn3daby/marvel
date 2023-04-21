import React from 'react';
import CharInfo from '../charInfo/CharInfo';
import CharFinder from '../CharFinder/CharFinder';
import './CharDynamic.scss'
const CharDynamic = ({charId}) => {
    return (
        <div className="char__dynamic">
            <CharInfo charId={charId}/>
            <CharFinder/>
        </div>
    );
};

export default CharDynamic;