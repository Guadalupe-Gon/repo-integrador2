import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { URL } from "../config/env.config";
import Swal from "sweetalert2";
import { UNSAFE_ErrorResponseImpl, useNavigate } from "react-router";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);



function UserProvider({ children }) {

    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    

    useEffect(() => { 

        user ? localStorage.setItem("user", JSON.stringify(user))
            : localStorage.removeItem("user");
        
        token ? localStorage.setItem("token", JSON.stringify(token))
            : localStorage.removeItem("token");
        
    }, [user, token]);

    
    async function login(data) {

        try {

            const response = await axios.post(`${URL}/login`, data)
            const { user, token } = response.data;

            setUser(user);
            setToken(token);

            Swal.fire({
                icon: "success",
                title: "Has iniciado sesión correctamente",
                text: `Bienvenido ${user.name}`,
                timer: 2000,
                showConfirmButton: false,
            }).then(() => {
                navigate("/");
            });

        } catch (error) {
            console.error("Error al iniciar sesión", error);
            Swal.fire({
                icon: "error",
                title: "Error al iniciar sesión",
                text: error.response.data.message,
            });
        }
    }

    function logout() {
        setUser(null);
        setToken(null);

        Swal.fire({
            icon: "success",
            title: "Sesión cerrada",
            text: "Has cerrado sesión correctamente",
            timer: 2000,
            showConfirmButton: false,
        }).then(() => {
            navigate("/");
        });
    }


    return (
        <UserContext.Provider
            value={{
                login,
                user,
                token,
                logout
            }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;
