import React from 'react'
import {
    ResourceList,
    ResourceItem,
    TextStyle,
    Avatar
} from '@shopify/polaris'

export default function Results(props) {

    const handleNominate = (movie) => props.nominateHandler(movie)
    return (
        <ResourceList
            resourceName={{ singular: 'Result', plural: 'Results' }}
            items={props.resultsList}
            emptyState="Keep searching!"
            renderItem={(item) => {
                const { imdbID, Title, Year, Poster } = item;
                const shortcutActions = {
                    content: 'Nominate',
                    accessibilityLabel: `Nominate ${Title}`,
                    disabled: Object.keys(props.nominations).includes(item.imdbID),
                    primary: true,
                    onClick: () => handleNominate(item)
                }
                return (
                    <ResourceItem
                        id={imdbID}
                        accessibilityLabel={`Nominate ${Title}`}
                        shortcutActions={shortcutActions}
                    // media={<Avatar
                    //     customer
                    //     name={Title}
                    //     source={Poster}
                    //     initials="OMDB"
                    //     accessibilityLabel={`Poster for ${Title}`}
                    // />}
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
