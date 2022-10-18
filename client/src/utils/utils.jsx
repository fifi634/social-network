// Check if value is empty, return boolean
export const isEmpty = (value) => {
    return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
    );
};


// Format Mongo style date in string client timezone date
export const dateParser = (mongoDate) => {
    let dateOptions = {
        timeZone: "Europe/Paris",
        hour12: false,
        hours: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric"
    };

    let hourOptions = {
        timeZone: "Europe/Paris",
        hour12: false,
        hours: "2-digit",
        minutes: "2-digit"
    };
    
    let timestamp = Date.parse(mongoDate);
    let date = new Date(timestamp).toLocaleDateString("fr-FR", dateOptions);
    let hour = new Date(timestamp).toLocaleTimeString("fr-FT", hourOptions);

    return date.toString() + ', ' + hour.toString();
};


// Format timestamp in string client timezone date
export const timestampParser = (timestamp) => {
    let dateOptions = {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric"
    };

    let hourOptions = {
        timeZone: "Europe/Paris",
        hour12: false,
        hours: "2-digit",
        minutes: "2-digit"
    }

    let date = new Date(timestamp).toLocaleDateString("fr-FR", dateOptions);
    let hour = new Date(timestamp).toLocaleTimeString("fr-FT", hourOptions);

    return date.toString() + ', ' + hour.toString();
};