import { Link } from "react-router-dom"
import style from './Footer.module.scss'

export function Footer () {

    return (
        <footer id={style.container}>
            <div>
                <div>
                    <p>© Hotel Overlook. Alle rettigheder forbeholdt.</p>
                </div>
                <div>
                    <a href="https://twitter.com/" target="_blank" rel="noreferrer">Tw</a>
                    <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">Fa</a>
                </div>
                <div>
                    <ul>
                        <li><Link to="/hoteller-og-destinationer">Hoteller og destinationer</Link></li>
                        <li><Link to="/vaerelser">Værelser</Link></li>
                        <li><Link to="/reservation">Reservation</Link></li>
                        <li><Link to="/login">Login</Link></li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}