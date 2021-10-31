
const URL = 'http://localhost:8000';

async function login ({name, password}, errCallback = (err) => {}) {
    try {
        const response = await fetch(`${URL}/account/login/`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "name": name,
                "password": password
            })
        });
        if (response.status === 200) return await response.json();
        return null;
    }
    catch(err) {
        errCallback(err)
    }
}

async function register ({name, password}, errCallback = (err) => {}) {
    try {
        const response = await fetch(`${URL}/account/register/`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "name": name,
                "password": password
            })
        });
        if (response.status === 200) return await response.json();
        return null;
    }
    catch(err) {
        errCallback(err)
    }   
}

async function checkDictionary ({text, lang, token}, errCallback = (err) => {}) {
    try {
        const response = await fetch(`${URL}/dictionary/${lang}/sentence/`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify({
                "text": text
            })
        })
        if (response.status === 200) return response.json();
        return null;
    } 
    catch(err) {
        errCallback(err)
    }
}

async function countService ({token}, errCallback = (err) => {}) {
    try {
        const response = await fetch(`${URL}/dictionary/`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + token,
            }
        });
        if (response.status === 200) return response.json();
        return null;
    } 
    catch(err) {
        errCallback(err)
    }
}

export {
    login,
    register,
    checkDictionary,
    countService
}