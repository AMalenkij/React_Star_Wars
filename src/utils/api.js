async function getApi(url) {
try {
const response = await fetch(url);
const data = await response.json();
return data;
} catch (error) {
console.error(error);
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
console.error(error);
return false;
}
}

export {getApi, getConcurrentApi };