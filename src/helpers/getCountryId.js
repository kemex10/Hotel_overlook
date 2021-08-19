import { fetchIt } from "./fetchIt";

export async function getCountryId(name) {
    let res = await fetchIt('https://api.mediehuset.net/overlook/countries')

    let arr = []
    res.items?.forEach((item) => {
        arr.push({id: item.id, seoSlug: item.name.toLowerCase().replace(/æ/g, 'ae').replace(/ø/g, 'oe').replace(/å/g, 'aa').replace(/ /g, '-').replace(/ö/g, 'o')})
    })

    let result

    arr.forEach((item) => {
        if (item.seoSlug === name) {
            result = item.id
        }
    })

    return result
}