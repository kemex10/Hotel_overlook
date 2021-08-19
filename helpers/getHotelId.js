import { fetchIt } from "./fetchIt";

export async function getHotelId(cityId, hotelName) {
    let res = await fetchIt(`https://api.mediehuset.net/overlook/hotels/by_city/${cityId}`)


    let arr = []
    res.items?.forEach((item) => {
        arr.push({id: item.id, seoSlug: item.title.toLowerCase().replace(/æ/g, 'ae').replace(/ø/g, 'oe').replace(/å/g, 'aa').replace(/ /g, '-').replace(/ö/g, 'o')})
    })

    let result

    arr.forEach((item) => {
        if (item.seoSlug === hotelName) {
            result = item.id
        }
    })


    return result
}