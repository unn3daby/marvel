import './appHeader.scss';
import {NavLink, Link} from 'react-router-dom';


const AppHeader = () => {

    //const isActive = ({isActive}) => isActive?{'color': '#9f0013'}:null;

    return (
        <header className="app__header">
            <h1 className="app__title">
                <Link to="/">
                    <span>Marvel</span> information portal
                </Link>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li><NavLink end style={({isActive}) => ({color: isActive?'#9f0013':'inherit'})} to="/">Characters</NavLink></li>
                    /
                    <li><NavLink end style={({isActive}) => ({color: isActive?'#9f0013':'inherit'})} to="/comics">Comics</NavLink></li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;