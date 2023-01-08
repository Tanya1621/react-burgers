export function convertDate(date: string) {
    let day;
    const time = `${date.substr(11, 5)}`
    const today = new Date();
    let currentDay = today.toISOString().slice(0, 10);
    if (currentDay === date.substr(0, 10)) {
    day = 'Today';
    } else if (Number(currentDay.substr(8, 2)) - Number(date.substr(8, 2)) === 1) {
        day = 'Yesterday'
    }
    else {
        day = `${date.substr(8, 2)}.${date.substr(5, 2)}`;
    }
    return `${day} at ${time}`
}

