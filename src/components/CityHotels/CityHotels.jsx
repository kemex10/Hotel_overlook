import { useEffect, useState } from 'react'
import { useParams, useRouteMatch } from 'react-router'
import { Link } from 'react-router-dom'
import { fetchIt } from '../../helpers/fetchIt'
import { getCityId } from '../../helpers/getCityId'
import { getCountryId } from '../../helpers/getCountryId'
import style from './CityHotels.module.scss'

export function CityHotels (props) {

    let { url } = useRouteMatch()
    let { countryName } = useParams()
    let { cityName } = useParams()
    let [cityInfo, setCityInfo] = useState([])

    useEffect(() => {
        const getCityInfo = async () => {
            let countryId = await getCountryId(countryName)
            let cityId = await getCityId(countryId, cityName)
            let res = await fetchIt(`https://api.mediehuset.net/overlook/cities/${cityId}`)
    
            setCityInfo(res)
            props.setImg(res.item.image)
            props.setHeading(res.item.name)
        }

        getCityInfo()
    }, [countryName, cityName, props])

    return (
        <section id={style.container}>
            {cityInfo.item ?
                <div className="hotel-destinations">
                    <article>
                        <div>
                            <h2>Vores hoteller i {cityInfo.item.name}</h2>
                            <p>{cityInfo.item.description}</p>
                        </div>
                        <div>
                            {cityInfo.item.hotels.items.map((hotel, i) => {
                                return (
                                    <Link key={i} to={`${url}/${hotel.title.toLowerCase().replace(/æ/g, 'ae').replace(/ø/g, 'oe').replace(/å/g, 'aa').replace(/ /g, '-').replace(/ö/g, 'o')}`}>
                                        <div>
                                            <img src={hotel.image} alt={hotel.title}/>
                                        </div>
                                        <div>
                                            <h3>{hotel.title}</h3>
                                            <p>Stjerner: {hotel.num_stars}</p>
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>
                    </article>
                    <div>
                        <h3>Se andre byer i {cityInfo.item.country_name}</h3>
                    </div>
                </div>
            : null}
        </section>
    )
}