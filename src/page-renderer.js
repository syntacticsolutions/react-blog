import React from 'react'
import {useRouteMatch} from 'react-router-dom'

const generatePage = page => {
    try {
        const Component = require(`./pages/${page}`).default
        return <Component />;
    } catch (err) {
        console.warn(err)
        return 'Under Construction'
    }
}

const PageRenderer = () => {
    const {
        params: { page }
    } = useRouteMatch()

    return generatePage(page)
}

export default PageRenderer