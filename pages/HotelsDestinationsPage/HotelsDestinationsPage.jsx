import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { HotelsDestinationsNav } from '../../components/HotelsDestinationsNav/HotelsDestinationsNav'
import style from './HotelsDestinationsPage.module.scss'
import { CountryHotels } from '../../components/CountryHotels/CountryHotels'
import { CityHotels } from '../../components/CityHotels/CityHotels'
import { HotelInfo } from '../../components/HotelInfo/HotelInfo'
import { useEffect, useState } from 'react'
import { Cover } from '../../components/Cover/Cover'
import { HotelHome } from '../../components/HotelHome/HotelHome'

export function HotelsDestinationsPage () {

    let { url } = useRouteMatch()
    let [height, setHeight] = useState('')
    let [img, setImg] = useState('')
    let [heading, setHeading] = useState('Hoteller og destinationer')

    useEffect(() => {
        setTimeout(() => {
            if(document.querySelector('.hotel-destinations')) {
                setHeight(`${document.querySelector('.hotel-destinations').offsetHeight + 600}px`) 
            }
        }, 300);
    }, [window.location.href])

    return (
        <div style={{minHeight: height}} id={style.container}>
            <Cover img={img} heading={heading} />
            <HotelsDestinationsNav />

            <Switch>
                <Route exact path={`${url}`}>
                    <HotelHome setImg={setImg} setHeading={setHeading} />
                </Route>
                <Route exact path={`${url}/:countryName`}>
                    <CountryHotels setImg={setImg} setHeading={setHeading} />
                </Route>

                <Route exact path={`${url}/:countryName/:cityName`}>
                    <CityHotels setImg={setImg} setHeading={setHeading} />
                </Route>

                <Route exact path={`${url}/:countryName/:cityName/:hotelName`}>
                    <HotelInfo setImg={setImg} setHeading={setHeading} />
                </Route>
            </Switch>
        </div>
    )
}