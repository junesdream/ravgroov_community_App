import {Navigate, Outlet} from "react-router-dom";
import React from "react";

type Props = {
    user: string | undefined
    isLoading: boolean
}

export default function ProtectedRoutes(props: Props) {

    const authenticated = props.user !== undefined && props.user !== 'anonymousUser'

    return (
        authenticated ? <Outlet /> : <Navigate to={"/login"} />
    )
}