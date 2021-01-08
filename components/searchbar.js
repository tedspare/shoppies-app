import React from 'react'
import { Icon, FormLayout, TextField } from '@shopify/polaris'
import { SearchMinor } from '@shopify/polaris-icons'

/**
 * Component for taking user input to search for a movie
 * 
 * @param {function(string)} queryHandler - Text input callback
 * @param {string} query - Text input value
 * 
 * @return {element} Form containing a TextField for input
 */
export default function SearchBar({ queryHandler, query }) {

    const handleQuery = (query) => queryHandler(query)

    return (
        <FormLayout>
            <TextField
                label="Movie title"
                value={query}
                onChange={handleQuery}
                prefix={<Icon source={SearchMinor} color="inkLighter" />}
                placeholder="Search"
            />
        </FormLayout>
    )
}
