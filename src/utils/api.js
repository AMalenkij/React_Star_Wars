async function getApi(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(`Could not fetch. Status code: ${response.status}`);
            // console.error('Could not fetch.', res.status);
            return false;
        }

        return data;
    } catch (error) {
        // console.error('Could not fetch.', error.message);
        throw new Error(`Could not fetch. Error: ${error.message}`);
        return false;
    }
}

async function getConcurrentApi(urls) {
    try {
        const promises = urls.map(async (url) => {
            const response = await fetch(url);
            return response.json();
        });
        const results = await Promise.all(promises);
        return results;
    } catch (error) {
        console.error('Could not fetch.', error.message);
        return false;
    }
}

export {getApi, getConcurrentApi};