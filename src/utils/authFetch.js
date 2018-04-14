export default async function authFetch(url, body, options) {
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

    const resp = await fetch(url, fetchOptions);

    if(resp.status === 401 && this && this.props && this.props.logout) {
        this.props.logout();
    }
    return resp;
};
