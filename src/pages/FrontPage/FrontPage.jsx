import { News } from '../../components/News/News';
import { SelectedRooms } from '../../components/SelectedRooms/SelectedRooms';
import { Slider } from '../../components/Slider/Slider';
import style from './FrontPage.module.scss'

export function FrontPage () {

    return (
        <div id={style.container}>
            <Slider />
            <News />
            <SelectedRooms />
        </div>
    )
}