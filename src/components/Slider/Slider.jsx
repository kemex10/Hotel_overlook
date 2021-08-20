import { useEffect, useState } from 'react'
import Carousel from 'react-material-ui-carousel'
import { fetchIt } from '../../helpers/fetchIt'
import style from './Slider.module.scss'
import './Slider.scss'

export function Slider () {

    const [cityInfo, setCityInfo] = useState([])

    useEffect(() => {
        getImgs()
    }, [])

    const getImgs = async () => {
        const infoArr = []
        let res = await fetchIt('https://api.mediehuset.net/overlook/all')

        res.cities.forEach((city) => {
            infoArr.push({cityImg: city.image, cityName: city.name})
        })

        setCityInfo(infoArr)
    }

    return (
        <div id={style.container} className="slider-dka">
            <h1>Velkommen til Hotel Overlook</h1>
            <Carousel>
                { cityInfo ? cityInfo.map((info, i) => {
                    return (
                        <div className={style.imgContainer} key={i}>
                            <img src={info.cityImg} alt={info.cityName}/>
                        </div>
                    )
                }) : null }
            </Carousel>
        </div>
    )
}