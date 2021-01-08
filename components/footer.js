import React from 'react'
import { Link } from '@shopify/polaris'
import styles from '../styles/Home.module.css'

/**
 * Component for rendering the page footer
 * 
 * @return {element} A div containing the footer and link to GitHub
 */
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
