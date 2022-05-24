export const makeArray = (data: any, className: any) => {
    let output: any[] = [];
    data.map((item: any) => {
        output.push(new className(item));
    })
    return output;
}