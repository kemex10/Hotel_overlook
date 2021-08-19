import { useEffect, useState } from 'react'
import { useParams, useRouteMatch } from 'react-router'
import { Link } from 'react-router-dom'
import { fetchIt } from '../../helpers/fetchIt'
import { getCountryId } from '../../helpers/getCountryId'
import style from './CountryHotels.module.scss'

export function CountryHotels (props) {
    
    let { url } = useRouteMatch()
    let { countryName } = useParams()
    let [countryInfo, setCountryInfo] = useState([])

    useEffect(() => {
        const getCountryInfo = async () => {
            let countryId = await getCountryId(countryName)
            let res = await fetchIt(`https://api.mediehuset.net/overlook/countries/${countryId}`)
            
            setCountryInfo(res)
            props.setImg(res.item.image)
            props.setHeading(res.item.name)
        }

        getCountryInfo()
    }, [countryName, props])    

    return (
        <section id={style.container}>
                {countryInfo.item ?
                <div className="hotel-destinations">
                    <article>
                        <div>
                            <h2>Vores hoteller i {countryInfo.item.name}</h2>
                            <p>{countryInfo.item.description}</p>
                        </div>
                        <div>
                            {countryInfo.item.cities.items.map((city, i) => {
                                return (
                                    <Link key={i} to={`${url}/${city.name.toLowerCase().replace(/æ/g, 'ae').replace(/ø/g, 'oe').replace(/å/g, 'aa').replace(/ /g, '-').replace(/ö/g, 'o')}`}>
                                        <div>
                                            <img src={city.image} alt={city.name}/>
                                        </div>
                                        <div>
                                            <h3>{city.name}</h3>
                                            <p>{city.description.substring(0, 130) + ' ...'}</p>
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>
                    </article>
                    <div>
                        <h3>Kort over {countryInfo.item.name}</h3>
                    </div>
                </div>
                : null}
        </section>
    )
}