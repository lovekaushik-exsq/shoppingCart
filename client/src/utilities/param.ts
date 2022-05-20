export const getUrlParam = (identifier: string): string | null => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const param = urlParams.get(identifier)
    return param;
}