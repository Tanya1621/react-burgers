const bun = 'bun';
const sauce = 'sauce';
const main = 'main';
const ingredient = 'ingredient';


type TStatuses = {
    [key: string]: any;
}
const statusOfOrder: TStatuses = {
    done: 'Готов',
    pending: 'Приготовление',
    created: 'Создан'
}

export {bun, sauce,main, ingredient, statusOfOrder}