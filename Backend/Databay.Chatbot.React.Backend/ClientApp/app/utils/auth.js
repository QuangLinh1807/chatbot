//
const getToken = (data) => {
    debugger;
    if (data.cookies.cookies.token) {

        return data.cookies.cookies.token;
    }
    return null;
}

export default getToken;
