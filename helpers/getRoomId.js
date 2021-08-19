import { fetchIt } from "./fetchIt";

export async function getRoomId(hotelId, roomName) {
    let res = await fetchIt(`https://api.mediehuset.net/overlook/rooms/by_hotel/${hotelId}`)


    let arr = []
    res.items?.forEach((item) => {
        arr.push({id: item.id, seoSlug: item.room_title.toLowerCase().replace(/æ/g, 'ae').replace(/ø/g, 'oe').replace(/å/g, 'aa').replace(/ /g, '-').replace(/ö/g, 'o')})
    })

    let result

    arr.forEach((item) => {
        if (item.seoSlug === roomName) {
            result = item.id
        }
    })


    return result
}