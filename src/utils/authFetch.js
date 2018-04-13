export default (url, body, options) => {
    const fetchOptions = {
        credentials: 'same-origin'
    };

    if(body) {
        Object.assign(fetchOptions, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
    }

    Object.assign(fetchOptions, options)

    console.log(fetchOptions);

    return fetch(url, fetchOptions);
};
