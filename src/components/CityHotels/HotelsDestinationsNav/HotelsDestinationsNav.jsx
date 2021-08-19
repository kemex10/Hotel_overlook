import { useEffect, useState } from 'react'
import { NavLink, useRouteMatch } from 'react-router-dom'
import { fetchIt } from '../../helpers/fetchIt'
import style from './HotelsDestinationsNav.module.scss'

export function HotelsDestinationsNav () {

    let { url } = useRouteMatch()

    const [countries, setCountries] = useState([])

    const getCountries = async () => {
        let res = await fetchIt('https://api.mediehuset.net/overlook/countries')
        setCountries(res)
    }

    useEffect(() => {
        getCountries()
    }, [])

    return (
        <nav id={style.container}>
            <ul>
                {countries.items ? countries.items.map((country, i) => {
                    return <li key={i}>
                        <NavLink data-id={country.id} activeStyle={{fontWeight: "bold"}} to={`${url}/${country.name.toLowerCase().replace(/æ/g, 'ae').replace(/ø/g, 'oe').replace(/å/g, 'aa').replace(/ /g, '-').replace(/ö/g, 'o')}`}>{country.name}</NavLink>
                    </li>
                }) : null}
            </ul>
        </nav>
    )
}