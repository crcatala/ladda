import { invalidate } from 'invalidator';
import { createQuery } from 'query';
import {
    deleteItem
} from 'datastore';

export function decorateDelete(apiFn, datastore, abstractEntity) {
    return (id) => {
        deleteFromEntityAndViews(datastore, abstractEntity, id);

        const result = apiFn(id);
        result.then(() => {
            invalidate(datastore, abstractEntity, 'DELETE');
        });
        return result;
    };
}

function deleteFromEntityAndViews(datastore, abstractEntity, id) {
    const types = [
        abstractEntity.val.viewOf,
        abstractEntity.name,
        ...abstractEntity.val.views
    ].filter(x => x);

    types.forEach(type => {
        deleteItem(datastore, createQuery(type, id));
    });
}