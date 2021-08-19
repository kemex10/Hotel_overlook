import { useState } from 'react';
import style from './Navigation.module.scss';
import { Link } from 'react-router-dom';

export function Navigation (props) {

    let loginData = props.loginData

    const [isActive, setActive] = useState(false);

    const handleToggle = () => {
        setActive(!isActive);
    }

    return (
        <header>
        <nav className={style.nav}>
            <Link to="/"><img src={require('../../content/img/hotel-overlook-logo.svg').default} alt="Hotel Overlook Logo"/></Link>

            <ul className={style.desktop}>
                <li><Link className={style.navigationLinks} to="/">Forside</Link></li>
                <li><Link className={style.navigationLinks} to="/hoteller-og-destinationer">Hoteller og Destinationer</Link></li>
                <li><Link className={style.navigationLinks} to="/vaerelser">Værelser</Link></li>
                <li><Link className={style.navigationLinks} to="/reservation">Reservation</Link></li>
                <li><Link className={style.navigationLinks} to="/login">{loginData.username ? 'Min side' : 'Login'}</Link></li>
            </ul>

            <div className={isActive ? style.burgerMenuActive : style.burgerMenu} onClick={handleToggle}>
                <div className={style.burgerMenuLine}></div>
                <div className={style.burgerMenuLine}></div>
                <div className={style.burgerMenuLine}></div>
            </div>

            <ul className={isActive ? style.activeMenu : style.menu}>
                <li><Link className={style.navigationLinks} to="/" onClick={handleToggle}>Forside</Link></li>
                <li><Link className={style.navigationLinks} to="/hoteller-og-destinationer" onClick={handleToggle}>Hoteller og Destinationer</Link></li>
                <li><Link className={style.navigationLinks} to="/vaerelser" onClick={handleToggle}>Værelser</Link></li>
                <li><Link className={style.navigationLinks} to="/reservation" onClick={handleToggle}>Reservation</Link></li>
                <li><Link className={style.navigationLinks} to="/login" onClick={handleToggle}>{loginData.username ? 'Min side' : 'Login'}</Link></li>
            </ul>
        </nav>
    </header>
    )
}