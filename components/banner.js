import React from 'react'
import { Banner, TextContainer } from '@shopify/polaris'

export default function SuccessBanner(props) {

    const handleDismiss = () => {
        props.dismissHandler()
    }

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
                <p>Thank you for nominating five movies! You are free to continue nominating.</p>
            </Banner>
        </TextContainer>
    )
}
