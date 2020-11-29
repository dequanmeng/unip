import React from 'react'

export const ProtectedRoute = ({auth,children}) => {
    return (
        <>
        {auth && children}
        </>
    )
}
