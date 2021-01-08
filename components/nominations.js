import React from 'react'
import { ResourceList, ResourceItem, TextStyle } from '@shopify/polaris'

/**
 * Component for rendering the user's nominations with remove buttons 
 * 
 * @param {function(string)} removeHandler - Remove button click callback
 * @param {Array<Object>} nominations - List of nomination objects
 * 
 * @return {element} ResourceList containing one ResourceItem for every
 * search result
 */
export default function Nominations({ removeHandler, nominations }) {

    const handleRemove = (imdbID) => removeHandler(imdbID)

    return (
        <ResourceList
            resourceName={{ singular: 'Nomination', plural: 'Nominations' }}
            items={Object.values(nominations)}
            emptyState="Add your first nomination!"
            renderItem={(item) => {
                const { imdbID, Title, Year } = item;
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
