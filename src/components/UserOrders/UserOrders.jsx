import { useEffect, useState } from 'react'
import { fetchIt } from '../../helpers/fetchIt'
import style from './UserOrders.module.scss'

export function UserOrders (props) {

    let loginData = props.loginData
    let setLoginData = props.setLoginData

    const [userOrders, setUserOrders] = useState([])

    useEffect(() => {
        const getUserOrders = async () => {
            let res = await fetchIt(`https://api.mediehuset.net/overlook/reservations/list_by_user/${loginData.user_id}`)
            setUserOrders(res)
        }

        getUserOrders()
    }, [userOrders, loginData.user_id])

    const signOut = () => {
        setLoginData([])
        sessionStorage.removeItem('token')
    }

    const deleteOrder = async (id) => {
        await fetchIt(`https://api.mediehuset.net/overlook/reservations/${id}`, 'DELETE', null, loginData.access_token)
    }

    const getMonth = (date) => {
        let month;
        switch(new Date(date).getMonth()) {
            case 0:
                month = "januar"
                break;
            case 1:
                month = "februar"
                break;
            case 2:
                month = "marts"
                break;
            case 3:
                month = "april"
                break;
            case 4:
                month = "maj"
                break;
            case 5:
                month = "juni"
                break;
            case 6:
                month = "juli"
                break;
            case 7:
                month = "august"
                break;
            case 8:
                month = "september"
                break;
            case 9:
                month = "oktober"
                break;
            case 10:
                month = "november"
                break;
            case 11:
                month = "december"
                break;
            default:
                month = "Der gik noget galt"
        }
        return month
    }

    const getDate = (date) => {
        return (
            new Date(date).getDate() + '. ' + getMonth(date) + ' ' + new Date(date).getFullYear()
        )
    }

    return (
        <>
            <article id={style.left}>
                    <div>
                        <h1>Administrer reservationer</h1>
                        <p>Her kan du ændre og afbestille dine reservationer</p>
                    </div>
                    {userOrders.items ? userOrders.items.map((userOrder, i) => {
                        return (
                            <div className={style.order}>
                                <div>
                                    <h3>Hotel og værelsestype</h3>
                                    <p>{userOrder.hotel_title}</p>
                                    <p>{userOrder.room_title}</p>
                                </div>
                                <div>
                                    <h3>Dato</h3>
                                    <p>{getDate(userOrder.checkin_date)}</p>
                                    <p>{getDate(userOrder.checkout_date)}</p>
                                </div>
                                <div>
                                    <h3>Antal personer</h3>
                                    <p>{userOrder.num_persons}</p>
                                </div>
                                <div>
                                    <h3>Handling</h3>
                                    <p id={userOrder.id} onClick={(e) => {deleteOrder(e.target.id)}}>Afbestil</p>
                                </div>
                            </div>
                        )
                    }) : <p>Ingen reservationer</p>}
            </article>
            <div id={style.right}>
                <h3>Dine oplysninger</h3>
                <p>Du er logget ind som <strong>{loginData.username ? loginData.username : null}</strong></p>
                <button className="button" onClick={() => signOut()}>Log ud</button>
            </div>
        </>
    )
}