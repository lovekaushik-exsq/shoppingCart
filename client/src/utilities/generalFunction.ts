export const getUrlParam = (identifier: string): string | null => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const param = urlParams.get(identifier)
    return param;
}

export const makeArray = (data: any, className: any) => {
    let output: any[] = [];
    data.map((item: any) => {
        let current = new className(item);
        output.push({ ...current });
    })
    return output;
}
