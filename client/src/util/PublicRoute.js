import React from 'react'

export const PublicRoute = ({auth,children}) => {
    return (
        <>
        {!auth && children}
        </>
    )
}
