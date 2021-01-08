import React from 'react'
import Head from 'next/head'

/**
 * Component for rendering the browser tab title and icon
 * 
 * @param {string} pageTitle - The title shown on the browser tab
 * 
 * @return {element} - Head component
 */
export default function Header({ pageTitle }) {
    return (
        <Head>
            <title>{pageTitle}</title>
            <link rel="icon" href="/favicon.svg" />
        </Head>
    )
}
