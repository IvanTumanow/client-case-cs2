import {useEffect, useState} from "react";
import {api} from "@/lib/axios/axios.ts";
import {SERVER_CONFIG} from "@/config/server.config.ts";


export default function Home() {
    const [userData, setUserData] = useState({})

    useEffect(() => {
        const fetchUserData = async () => {
            const res = await api.get(`${SERVER_CONFIG.SERVER.VITE_SERVER_URL}/user/me`)

            setUserData(res.data)
        }

        fetchUserData()
    }, [])

    return (
        <div>
            <h1>Home page</h1>

            <h2>{Object.keys(userData).length !== 0 ? 'Вы авторизованы' : 'Вы не авторизованы'}</h2>

            <pre>
                {JSON.stringify(userData, null, 2)}
            </pre>

            <p>Lorem20</p>
            <p>Lorem20</p>
            <p>Lorem20</p>
            <p>Lorem20</p>
            <p>Lorem20</p>
            <p>Lorem20</p>
            <p>Lorem20</p>
            <p>Lorem20</p>
            <p>Lorem20</p>
            <p>Lorem20</p>
            <p>Lorem20</p>
            <p>Lorem20</p>
            <p>Lorem20</p>
            <p>Lorem20</p>
            <p>Lorem20</p>
            <p>Lorem20</p>
            <p>Lorem20</p>
            <p>Lorem20</p>
            <p>Lorem20</p>
            <p>Lorem20</p>
            <p>Lorem20</p>
            <p>Lorem20</p>
            <p>Lorem20</p>
            <p>Lorem20</p>
            <p>Lorem20</p>
            <p>Lorem20</p>
            <p>Lorem20</p>
            <p>Lorem20</p>
            <p>Lorem20</p>
            <p>Lorem20</p>
            <p>Lorem20</p>
            <p>Lorem20</p>
            <p>Lorem20</p>
            <p>Lorem20</p>
            <p>Lorem20</p>
            <p>Lorem20</p>
        </div>
    )
}