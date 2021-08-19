import { useEffect, useState } from 'react'
import { fetchIt } from '../../helpers/fetchIt'
import style from './News.module.scss'

export function News () {

    const [news, setNews] = useState([])

    const getNews = async () => {
        let res = await fetchIt('https://api.mediehuset.net/overlook/news')
        setNews(res)
    }

    useEffect(() => {
        getNews()
    }, [])
    
    return (
        <section id={style.container}>
            <div>
                <h2>Se vores nyheder</h2>
                <article>
                    {news.items ? news.items.map((item, i) => {
                        if (i < 3) {
                            return (
                                <div key={i}>
                                    <div>
                                        <img src={item.image} alt={item.title}/>
                                    </div>
                                    <div>
                                        <h3>{item.title.substring(0, 30) + ' ...'}</h3>
                                        <p>{item.teaser.substring(0, 130) + ' ...'}</p>
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