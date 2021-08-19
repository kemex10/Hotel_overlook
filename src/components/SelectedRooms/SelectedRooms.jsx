import { useEffect, useState } from 'react'
import { fetchIt } from '../../helpers/fetchIt'
import style from './SelectedRooms.module.scss'

export function SelectedRooms () {

    const [selectedRooms, setSelectedRooms] = useState([])

    const getSelectedRooms = async () => {
        let res = await fetchIt('https://api.mediehuset.net/overlook/rooms/by_hotel/1')
        setSelectedRooms(res)
    }

    useEffect(() => {
        getSelectedRooms()
    }, [])
    
    return (
        <section id={style.container}>
            <div>
                <h2>Se udvalgte værelser</h2>
                <article>
                    {selectedRooms.items ? selectedRooms.items.map((item, i) => {
                        if (i < 3) {
                            return (
                                <div key={i}>
                                    <div>
                                        <img src={item.images[0].image} alt={item.room_title}/>
                                    </div>
                                    <div>
                                        <h3>{item.room_title}</h3>
                                        <p>{item.description.substring(0, 80) + ' ...'}</p>
                                    </div>
                                </div>
                            )
                        } else {
                            return null
                        }
                    }) : null}
                </article>
            </div>
        </section>
    )
}