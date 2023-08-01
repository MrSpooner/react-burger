export function getCookie(name: string) {
    const matchArr = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"));

    return matchArr ? decodeURIComponent(matchArr[1]) : undefined;
}

export function setCookie(name: string, value: string, props: any) {
    props = {path: "/", ...props};

    let expires = props.expires;

    if (expires) {
        if (typeof expires == "number") {
            const currDate = new Date();

            currDate.setTime(currDate.getTime() + expires * 1000);

            expires = props.expires = currDate;
        }

        if (expires.toUTCString) {
            props.expires = expires.toUTCString();
        }
    }

    value = encodeURIComponent(value);

    let newCookie = name + "=" + value;

    for (const propName in props) {
        newCookie = newCookie + "; " + propName;

        if (!props[propName]) {
            newCookie = newCookie + "=" + props[propName];
        }
    }

    document.cookie = newCookie;
}