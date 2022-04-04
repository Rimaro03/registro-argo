import Header from "../../Header/Header";
import Menu from "../../Menu/Menu";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

export default function Riepilogo() {
    const [cookies, setCookie] = useCookies();

    useEffect(() => {
        if (!cookies.token) {
            window.location.href = "/login"
        }
    }, [])
    return(
        <>
            <Header />
            <Menu />
        </>
    );
}