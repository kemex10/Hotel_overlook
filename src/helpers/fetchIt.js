/**
 * Funktion der kan fetch udfra url, type (GET, POST, DELETE), data og bearer key
 * 
 * @param {string} url 
 * @param {string} type 
 * @param {object} data 
 * @param {string} key 
 * @returns 
 */
 export async function fetchIt(url, type, data, key) {

    let method = type || 'GET'
    let body = data || null
    let headers = {
        'Authorization' : `Bearer ${key}`
    } || null

    const options = {
        method : method,
        body : body,
        headers : headers
    }

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return data;
    }
    catch(error) {
        console.log(error);
    }
}