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
                    <a href="https://twitter.com/" target="_blank" rel="noreferrer">T</a>
                    <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">F</a>
                </div>
                <div>
                    <ul>
                        <li><Link to="/hoteller-og-destinationer">Hoteller og destinationer</Link></li>
                        <li><Link to="/vaerelser">Værelser</Link></li>
                        <li><Link to="/reservation">Reservation</Link></li>
                        <li><Link to="/om-overlook">Om Overlook</Link></li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}