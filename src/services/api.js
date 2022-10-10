import {INGREDIENTS_URL} from "../utils/api";

export const getItemsRequest = async () =>
{
 await fetch(INGREDIENTS_URL, {
            method: 'GET',
        });
}

