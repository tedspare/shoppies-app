import React from 'react'
import { ResourceList, ResourceItem, TextStyle } from '@shopify/polaris'

export default function Nominations(props) {

    const handleRemove = (imdbID) => {
        props.removeHandler(imdbID)
    }

    return (
        <ResourceList
            resourceName={{ singular: 'Nomination', plural: 'Nominations' }}
            items={Object.values(props.nominations)}
            emptyState="Add your first nomination!"
            renderItem={(item) => {
                const { imdbID, Title, Year, Poster } = item;
                const shortcutActions = {
                    content: 'Remove',
                    accessibilityLabel: `Remove ${Title}`,
                    onClick: () => handleRemove(item.imdbID),
                    destructive: true,
                    outline: true
                }
                return (
                    <ResourceItem
                        id={imdbID}
                        accessibilityLabel={`Remove ${Title}`}
                        shortcutActions={shortcutActions}
                    >
                        <h3 style={{ maxWidth: "60%" }}>
                            <TextStyle variation="strong">{Title}</TextStyle>
                        </h3>
                        <p>{Year}</p>
                    </ResourceItem>
                );
            }}
        />
    )
}
