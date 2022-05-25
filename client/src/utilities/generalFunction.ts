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

export const togglePassword = () => {
    document.querySelectorAll('.pass').forEach((toggle: Element) => {
        toggle.querySelector('.togglePassword')!.addEventListener('click', (e: Event) => {
            e.preventDefault();
            const visibility = toggle!.querySelector('input');
            const type = visibility!.getAttribute("type") === "password" ? "text" : "password";
            visibility!.setAttribute("type", type);
            toggle.querySelector('#icon')?.classList.toggle("bi-eye");
        })
    })
}


export const unAuthorized = (msg: string) => {
    alert(msg);
    return window.history.go(-1);
}