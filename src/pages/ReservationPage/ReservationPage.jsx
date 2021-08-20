import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom';
import { Cover } from '../../components/Cover/Cover'
import { fetchIt } from '../../helpers/fetchIt'
import { getCityId } from '../../helpers/getCityId';
import { getCountryId } from '../../helpers/getCountryId';
import { getHotelId } from '../../helpers/getHotelId';
import { getRoomId } from '../../helpers/getRoomId';
import style from './ReservationPage.module.scss'

export function ReservationPage () {

    const { register, handleSubmit, formState: { errors } } = useForm()
    const [orderComplete, setOrderComplete] = useState(false)

    const onSubmit = async (data) => {
        let loginData = new URLSearchParams();
        loginData.append("username", data.username);
        loginData.append("password", data.password);

        let token = await fetchIt('https://api.mediehuset.net/token', 'POST', loginData)

        let reservationData = new URLSearchParams()
        reservationData.append("user_id", token.user_id);
        reservationData.append("hotel_id", data.hotel_id);
        reservationData.append("room_id", data.room_id);
        reservationData.append("is_flex", data.is_flex);
        reservationData.append("num_persons", data.num_persons);
        reservationData.append("checkin", Math.round(new Date(data.checkin).getTime()/1000));
        reservationData.append("checkout", Math.round(new Date(data.checkout).getTime()/1000));
        reservationData.append("firstname", data.firstname);
        reservationData.append("lastname", data.lastname);
        reservationData.append("email", data.username);
        reservationData.append("phone", data.phone);
        reservationData.append("comment", data.comment);
        let res = await fetchIt('https://api.mediehuset.net/overlook/reservations', 'POST', reservationData, token.access_token)

        if (res.status === true) {
            setOrderComplete(true)
        }
    }

    const [data, setData] = useState([])

    const getData = async () => {
        let res = await fetchIt('https://api.mediehuset.net/overlook/all')
        setData(res)
    }

    let { countryName } = useParams()
    let { cityName } = useParams()
    let { hotelName } = useParams()
    let { roomName } = useParams()
    let { priceType } = useParams()

    const [selected, setSelected] = useState({})

    useEffect(() => {
        getData()

        const getSelected = async () => {
            if (countryName) {
                let countryId = await getCountryId(countryName)
                let cityId = await getCityId(countryId, cityName)
                let hotelId = await getHotelId(cityId, hotelName)
                let roomId = await getRoomId(hotelId, roomName)

                let isFlex;
                if (priceType === "normal") {
                    isFlex = 0
                } else if (priceType === "flex") {
                    isFlex = 1
                }

                let res = {hotel_id: hotelId, room_id: roomId, is_flex: isFlex}
                setSelected(res)
            }
        }

        getSelected()
    }, [countryName, cityName, hotelName, roomName, priceType])




    return (
        <section id={style.container}>
            <Cover heading={'Reservation'}/>
            <div className="hotel-destinations">
                <article>
                    {orderComplete ?
                    <div className={style.completed}>
                        <h2>Tak for din reservation</h2>
                        <p>Vi takker for din reservation og ønsker dig et behageligt ophold på Hotel Overlook</p>
                        <Link to="/">Gå til forsiden</Link>
                    </div> :

                    <>
                    <div>
                        <h2>Reserver dit fortrukne værelse</h2>
                        <p>Her kan du vælge destination, hotel, værelsestype og gennemføre din Overlook booking.</p>
                    </div>
                    <div>
                        <form onSubmit={handleSubmit(onSubmit)}>

                            <div className={style.one}>
                                <label>
                                    <p>Destination/Hotel: <span>*</span></p>
                                    <select {...register('hotel_id', { required: true })}>
                                        {data.hotels ? data.hotels.map((hotel, i) => {
                                            return (
                                                <>
                                                {selected.hotel_id ? 
                                                    <>
                                                    {selected.hotel_id === hotel.id ?
                                                        <>
                                                        <option selected value={hotel.id}>{hotel.title}</option>
                                                        </>
                                                        : <option value={hotel.id}>{hotel.title}</option>}
                                                    </>
                                                    : <option value={hotel.id}>{hotel.title}</option>}
                                                </>
                                            )
                                        }) : null}
                                    </select>
                                </label>
                                {errors.hotel_id && <p className="error">Vælg destination/hotel</p>}
                            </div>

                            <div className={style.two}>
                                <div>
                                    <label>
                                        <p>Værelsestype: <span>*</span></p>
                                        <select {...register('room_id', { required: true })}>
                                            {data.rooms ? data.rooms.map((room, i) => {
                                                return (
                                                    <>
                                                    {selected.hotel_id ?
                                                        <>
                                                            {selected.room_id === room.id ?
                                                            <>
                                                            <option selected key={i} value={room.id}>{room.title}</option>
                                                            </>
                                                            : <option key={i} value={room.id}>{room.title}</option>}
                                                        </>
                                                        : <option key={i} value={room.id}>{room.title}</option>}
                                                    </>
                                                )
                                            }) : null }
                                        </select>
                                    </label>
                                    {errors.room_id && <p className="error">Vælg værelsestype</p>}
                                </div>

                                <div>
                                    <label>
                                        <p>Antal personer: <span>*</span></p>
                                        <select {...register('num_persons', { required: true })}>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>
                                    </label>
                                    {errors.num_persons && <p className="error">Vælg antal personer</p>}
                                </div>
                            </div>

                            <div className={style.one}>
                                <div>
                                <label>
                                    <p>Prisklasse: <span>*</span></p>
                                    <div>
                                        {selected.hotel_id ?
                                        <>
                                            {Number(selected.is_flex) === 0 ? 
                                            <>
                                                <input checked type="radio" id="normal-price" value="false" {...register('is_flex', { required: true })}/>
                                                <label htmlFor="normal-price">Normal pris</label>

                                                <input type="radio" id="flex-price" value="true" {...register('is_flex', { required: true })}/>
                                                <label htmlFor="flex-price">Flex pris</label>
                                            </> : 
                                            <>
                                                <input type="radio" id="normal-price" value="false" {...register('is_flex', { required: true })}/>
                                                <label htmlFor="normal-price">Normal pris</label>

                                                <input checked type="radio" id="flex-price" value="true" {...register('is_flex', { required: true })}/>
                                                <label htmlFor="flex-price">Flex pris</label>
                                            </>}
                                        </> : 
                                        <>
                                            <input type="radio" id="normal-price" value="false" {...register('is_flex', { required: true })}/>
                                            <label htmlFor="normal-price">Normal pris</label>
                                    
                                            <input type="radio" id="flex-price" value="true" {...register('is_flex', { required: true })}/>
                                            <label htmlFor="flex-price">Flex pris</label>
                                        </>}
                                    </div>
                                </label>
                                {errors.is_flex && <p className="error">Vælg prisklasse</p>}
                                </div>
                            </div>

                            <div className={style.two}>
                            <div>
                                <label>
                                    <p>Check-ind dato: <span>*</span></p>
                                    <input type="date" {...register('checkin', { required: true })}/>    
                                </label>
                                {errors.checkin && <p className="error">Vælg check-ind dato</p>}
                                </div>

                                <div>
                                <label>
                                    <p>Check-ud dato: <span>*</span></p>
                                    <input type="date" {...register('checkout', { required: true })}/>
                                </label>
                                {errors.checkout && <p className="error">Vælg check-ud dato</p>}
                                </div>
                            </div>


                            <div className={style.two}>
                            <div>
                                <label>
                                    <p>Fornavn: <span>*</span></p>
                                    <input type="text" placeholder="Indtast fornavn" {...register('firstname', { required: true })}/>
                                </label>
                                {errors.firstname && <p className="error">Indtast fornavn</p>}
                                </div>

                                <div>
                                <label>
                                    <p>Efternavn: <span>*</span></p>
                                    <input type="text" placeholder="Indtast efternavn" {...register('lastname', { required: true })}/>
                                </label>
                                {errors.lastname && <p className="error">Indtast efternavn</p>}
                                </div>
                            </div>

                            <div className={style.two}>
                            <div>
                                <label>
                                    <p>Brugernavn <span>*</span></p>
                                    <input type="text" placeholder="Indtast brugernavn" {...register('username', { required: true })}/>
                                </label>
                                {errors.username && <p className="error">Indtast brugernavn</p>}
                                </div>

                                <div>
                                <label>
                                    <p>Adgangskode <span>*</span></p>
                                    <input type="password" placeholder="Indtast brugernavn" {...register('password', { required: true })}/>
                                </label>
                                {errors.password && <p className="error">Indtast adgangskode</p>}
                                </div>
                            </div>

                            <div className={style.one}>
                            <div>
                                <label>
                                    <p>Telefon: <span>*</span></p>
                                    <input type="number" placeholder="Indtast telefonnummer" {...register('phone', { required: true })}/>
                                </label>
                                {errors.phone && <p className="error">Indtast telefonnummer</p>}
                                </div>
                            </div>

                            <div className={style.one}>
                            <div>
                                <label>
                                    Kommentar:
                                    <input type="text" {...register('comment')}/>
                                </label>
                                </div>
                            </div>

                            <div className={style.inline}>
                            <div>
                                <label htmlFor="conditions">
                                    <input type="checkbox" id="conditions" {...register('conditions', { required: true })}/>
                                    Jeg accepterer hermed Overlooks betingelser
                                </label>
                                {errors.conditions && <p className="error">Accepter betingelser</p>}
                                </div>
                            </div>

                            <div>
                                <button className="button">Send reservation</button>
                            </div>
                        </form>
                    </div>
                    </>}
                </article>
                <div>
                    <h3>Betingelser</h3>
                </div>
            </div>
        </section>
    )
}