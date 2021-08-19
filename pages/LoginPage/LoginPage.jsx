import { useForm } from 'react-hook-form'
import { Cover } from '../../components/Cover/Cover'
import { UserOrders } from '../../components/UserOrders/UserOrders'
import { fetchIt } from '../../helpers/fetchIt'
import style from './LoginPage.module.scss'

export function LoginPage (props) {

    let loginData = props.loginData
    let setLoginData = props.setLoginData

    const { register, handleSubmit, formState: { errors } } = useForm()

    const onSubmit = async (data, event) => {
        event.target.reset()

        let formData = new URLSearchParams()
        formData.append('username', data.username)
        formData.append('password', data.password)

        let res = await fetchIt('https://api.mediehuset.net/token', 'POST', formData)

        setToken(res)
    }

    const setToken = (res) => {
        if (!res.message) {
            setLoginData(res)
            sessionStorage.setItem('token', JSON.stringify(res))
        }

        if (res.message === 'No authorization') {
            console.log('Forkert brugernavn eller password. Prøv igen.')
        }
    }

    return (
        <section id={style.container}>
            <Cover />
            <div className="hotel-destinations">
                {loginData.username ?
                    <UserOrders loginData={loginData} setLoginData={setLoginData}/> : 
                <article>
                    <div>
                        <h1>Login</h1>
                        <p>Her kan du logge ind og administrere dine reservationer.</p>
                    </div>
                    <div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <label>
                                Brugernavn:
                                <input name="username" placeholder="Indtast dit brugernavn" {...register('username', { required: true })}/>
                            </label>
                            {errors.username && <p className="error">Udfyld brugernavn</p>}

                            <label>
                                Adgangskode:
                                <input name="password" placeholder="Indtast din adgangskode" type="password" {...register('password', { required: true })}/>
                            </label>
                            {errors.password && <p className="error">Udfyld adgangskode</p>}

                            <button className="button">Login</button>
                        </form>
                    </div>
                </article>
                }
            </div>
        </section>
    )
}