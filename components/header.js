import React from 'react'
import Head from 'next/head'

export default function Header(props) {
    return (
        <Head>
            <title>{props.pageTitle}</title>
            <link rel="icon" href="/favicon.svg" />
        </Head>
    )
}
