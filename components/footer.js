import React from 'react'
import { Link } from '@shopify/polaris'
import styles from '../styles/Home.module.css'

export default function Footer() {
    return (
        <div>
            <footer className={styles.footer}>
                <p> To Shopify ❤️ </p>
                <Link
                    external
                    url="https://github.com/tedspare"
                >
                    Ted Spare
                </Link>
            </footer>
        </div>
    )
}
