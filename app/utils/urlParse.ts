export function urlParse(url: string) {
    let urlArr = url.replace("/", " ").split(" ");
    return urlArr.slice(1, urlArr.length);
}