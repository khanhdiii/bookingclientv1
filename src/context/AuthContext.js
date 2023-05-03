import { createContext, useEffect, useReducer, useState } from "react"

const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem("user")),
    loading: false,
    error: null,
}


export const AuthContext = createContext(INITIAL_STATE)

const AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                user: null,
                loading: false,
                error: null
            };
        case "LOGIN_SUCCESS":
            return {
                user: action.payload,
                loading: false,
                error: null
            };
        case "LOGIN_FAIL":
            return {
                user: null,
                loading: false,
                error: action.payload
            };
        case "LOGOUT":
            return {
                user: null,
                loading: false,
                error: null
            }
        default:
            return state
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)
    const [user, setUser] = useState(null);
    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user))
    }, [state.user])
    return (
        <AuthContext.Provider value={{ user: state.user, setUser, loading: state.loading, error: state.error, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}