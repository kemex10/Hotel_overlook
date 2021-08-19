import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { fetchIt } from '../../helpers/fetchIt'
import { getCityId } from '../../helpers/getCityId'
import { getCountryId } from '../../helpers/getCountryId'
import { getHotelId } from '../../helpers/getHotelId'
import style from './HotelInfo.module.scss'

export function HotelInfo (props) {

    let { countryName } = useParams()
    let { cityName } = useParams()
    let { hotelName } = useParams()
    let [hotelInfo, setHotelInfo] = useState([])

    useEffect(() => {
        const getHotelInfo = async () => {

            let countryId = await getCountryId(countryName)
            let cityId = await getCityId(countryId, cityName)
            let hotelId = await getHotelId(cityId, hotelName)
            let res = await fetchIt(`https://api.mediehuset.net/overlook/hotels/${hotelId}`)
    
            setHotelInfo(res)
            props.setImg(res.item.image)
            props.setHeading(res.item.title)
        }

        getHotelInfo()
    }, [countryName, cityName, hotelName, props])

    const [isActive, setActive] = useState(false);

    const showMore = () => {
        setActive(!isActive)
    }

    return (
        <section id={style.container}>
            {hotelInfo.item ?
                <div className="hotel-destinations">
                    <article>
                        <div>
                            <div>
                                <h2>{hotelInfo.item.title}</h2>
                                <p>{hotelInfo.item.num_stars} stjerner</p>
                            </div>
                            <p>{hotelInfo.item.teaser}</p>
                        </div>
                        <h2>Vores værelser</h2>
                        <div>
                            {hotelInfo.item.rooms.items.map((room, i) => {
                                return (
                                    <div key={i}>
                                        {!isActive ? 
                                            <>
                                                <div>
                                                    <div>
                                                        <img src={room.images[0].image} alt={room.room_title}/>
                                                    </div>
                                                    <div>
                                                        <h3>{room.room_title}</h3>
                                                        <p>{room.area}. Plads til {room.num_persons} person(er).</p>
                                                        <p>{room.description}</p>
                                                        <p>Fra {room.day_price_normal} DKK</p>
                                                    </div>
                                                </div>
                                                <div>
                                                    <p onClick={showMore}>▽ Vis mere</p>
                                                </div>
                                            </> : 

                                            <>
                                                <div className={style.full}>
                                                    <div>
                                                        <img src={room.images[0].image} alt={room.room_title}/>
                                                    </div>
                                                    <div>
                                                        <h3>{room.room_title}</h3>
                                                        <p>{room.area}. Plads til {room.num_persons} person(er).</p>
                                                        <p>{room.description}</p>
                                                    </div>
                                                    <div>
                                                        <div>
                                                            <div>
                                                                <h4>NORMAL Pris - inkl. morgenmad</h4>
                                                                <p>Kan ikke ændres eller afbestilles</p>
                                                            </div>
                                                            <div>
                                                                <p><span>{room.day_price_normal}</span> DKK/nat</p>
                                                                <Link className="button" to={`/reservation/${countryName}/${cityName}/${hotelName}/${room.room_title.toLowerCase().replace(/æ/g, 'ae').replace(/ø/g, 'oe').replace(/å/g, 'aa').replace(/ /g, '-').replace(/ö/g, 'o')}/normal`}>Book</Link>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div>
                                                                <h4>FLEX Pris - inkl. morgenmad</h4>
                                                                <p>Kan ændres eller afbestilles</p>
                                                            </div>
                                                            <div>
                                                                <p><span>{room.day_price_flex}</span> DKK/nat</p>
                                                                <Link className="button" to={`/reservation/${countryName}/${cityName}/${hotelName}/${room.room_title.toLowerCase().replace(/æ/g, 'ae').replace(/ø/g, 'oe').replace(/å/g, 'aa').replace(/ /g, '-').replace(/ö/g, 'o')}/flex`}>Book</Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <p onClick={showMore}>△ Vis mindre</p>
                                                </div>
                                            </>}

                                    </div>
                                )
                            })}
                        </div>
                    </article>
                    <div>
                        <h3>Hotel Information</h3>
                        <p>{hotelInfo.item.address}</p>
                        <p>{hotelInfo.item.phone}</p>

                        <h3>Faciliteter</h3>
                        {hotelInfo.item.facilities.map((facility, i) => {
                            return (
                                <p key={i}>{facility.title}</p>
                            )
                        })}
                    </div>
                </div>
            : null}
        </section>
    )
}