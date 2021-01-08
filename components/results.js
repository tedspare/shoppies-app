import React from 'react'
import {
    ResourceList,
    ResourceItem,
    TextStyle,
    Avatar
} from '@shopify/polaris'

/**
 * Component for rendering the search results with nomination buttons
 * 
 * @param {Array<Object>} nominations - The list of nomination objects by imdbID
 * @param {Array<Object>} resultsList - The list of search results from the OMDB API
 * @param {function(Object)} nominateHandler - Nomination button click callback
 * 
 * @return {element} ResourceList containing one ResourceItem for every nomination
 */
export default function Results({ nominations, resultsList, nominateHandler }) {

    const handleNominate = (movie) => nominateHandler(movie)
    return (
        <ResourceList
            resourceName={{ singular: 'Result', plural: 'Results' }}
            items={resultsList}
            emptyState="Keep searching!"
            renderItem={(item) => {
                const { imdbID, Title, Year, Poster } = item;
                const shortcutActions = {
                    content: 'Nominate',
                    accessibilityLabel: `Nominate ${Title}`,
                    disabled: Object.keys(nominations).includes(item.imdbID),
                    primary: true,
                    onClick: () => handleNominate(item)
                }
                return (
                    <ResourceItem
                        id={imdbID}
                        accessibilityLabel={`Nominate ${Title}`}
                        shortcutActions={shortcutActions}
                        media={<Avatar
                            customer
                            name={Title}
                            source={Poster}
                            initials="OMDB"
                            accessibilityLabel={`Poster for ${Title}`}
                        />}
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
