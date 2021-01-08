import React from 'react'
import {
    Icon,
    FormLayout,
    TextField
} from '@shopify/polaris'
import { SearchMinor } from '@shopify/polaris-icons'

export default function SearchBar(props) {

    const handleQuery = (query) => props.queryHandler(query)

    return (
        <FormLayout>
            <TextField
                label="Movie title"
                value={props.query}
                onChange={handleQuery}
                prefix={<Icon source={SearchMinor} color="inkLighter" />}
                placeholder="Search"
            />
        </FormLayout>
    )
}
