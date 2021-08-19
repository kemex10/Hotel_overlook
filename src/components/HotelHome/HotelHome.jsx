import { useEffect } from 'react'
import img from '../../content/img/harbour-gothenburg.jpg'
import style from './HotelHome.module.scss'

export function HotelHome (props) {
    
    useEffect(() => {
        props.setImg(img)
        props.setHeading('Hoteller og destinationer')
    }, [props])

    return (
        <section id={style.container}>
            <div className="hotel-destinations">
                <article>
                    <div>
                        <h2>Hoteller og destinationer</h2>
                        <p>Her finder du information om Overlooks hoteller og destinationer.</p>
                    </div>
                </article>
            </div>
        </section>
    )
}