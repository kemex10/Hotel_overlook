import { fetchIt } from "./fetchIt";

export async function getCityId(countryId, cityName) {
    let res = await fetchIt(`https://api.mediehuset.net/overlook/cities/by_country/${countryId}`)

    let arr = []
    res.items?.forEach((item) => {
        arr.push({id: item.id, seoSlug: item.name.toLowerCase().replace(/æ/g, 'ae').replace(/ø/g, 'oe').replace(/å/g, 'aa').replace(/ /g, '-').replace(/ö/g, 'o')})
    })

    let result

    arr.forEach((item) => {
        if (item.seoSlug === cityName) {
            result = item.id
        }
    })


    return result
}