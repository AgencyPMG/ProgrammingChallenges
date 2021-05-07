import React from 'react';

export function ComponentMap({ component, array, ...props }) {
    const name = component.name.toLowerCase();
    const MapTo = component;

    if (array.length === 0) {
        return <h1>No {name.charAt(0).toUpperCase() + name.slice(1)}</h1>;
    }

    return array.map((item, index) => {
        props[name] = item;
        return <MapTo
            key={`${name}-${index}`}
            {...props}
        />});
}
