import axios from 'axios';

export class ClientRequests {
    getHeaders(url, mainUrl = '') {
        const finalURL = `${mainUrl}${url}`;
        const headers = { 'Content-Type': 'application/json' };

        return {
            finalURL,
            headers
        };
    }

    GET(url, mainUrl = '') {
        const { finalURL, headers } = this.getHeaders(url, mainUrl);

        return new Promise((resolve, reject) => {
            axios.get(finalURL, headers)
                .then(response => {
                    resolve({
                        data: response.data,
                        statusCode: response.status
                    });
                })
                .catch(ex => {
                    reject({ message: ex.message });
                });
        });
    }
}
