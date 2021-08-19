import style from './Cover.module.scss'
import orgImg from '../../content/img/harbour-gothenburg.jpg'

export function Cover (props) {

    let img = props.img
    let heading = props.heading

    return (
        <div id={style.container}>
            {img ? <img src={img} alt={heading}/> : <img src={orgImg} alt={heading}/>}
            {heading ? <h1>{heading}</h1> : null}
        </div>
    )
}