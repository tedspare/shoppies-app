import React from 'react'
import { Banner, TextContainer } from '@shopify/polaris'

/**
 * Component for displaying a success message to the user
 * after they have nominated five movies
 * 
 * @param {function} dismissHandler - Dismiss button click callback 
 * 
 * @return {element} Banner component with text and dismiss events
 */
export default function SuccessBanner({ dismissHandler }) {

    const handleDismiss = () => dismissHandler()

    return (
        <TextContainer>
            <Banner
                title="Complete 🎉"
                status="success"
                action={{
                    content: 'Keep nominating',
                    onClick: () => handleDismiss()
                }}
                onDismiss={() => handleDismiss()}
            >
                <p>Thank you for nominating five movies!
                    You are free to continue nominating.</p>
            </Banner>
        </TextContainer>
    )
}
