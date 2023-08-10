removeIsValid = (el) => {
    if (Array.from(el.classList).includes('is-valid'))
        el.classList.toggle('is-valid');
}

removeIsInvalid = (el) => {
    if (Array.from(el.classList).includes('is-invalid'))
        el.classList.toggle('is-invalid');
}

IPValidator = (IP) => {
    const noSpaceIP = IP.split(" ").join("");
    const ipFormat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    const IPArray = noSpaceIP.split(",");
    const notValidIP = [];
    for (let i = 0; i < IPArray.length; ++i) {
        if (!IPArray[i].match(ipFormat)) {
            notValidIP.push(i + 1);
        }
    }
    return notValidIP;
}

URLValidator = (URL) => {
    const noSpaceURL = URL.split(" ").join("");
    const urlFormat = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    const URLArray = noSpaceURL.split(",");
    const notValidURL = [];
    for (let i = 0; i < URLArray.length; ++i) {
        if (!URLArray[i].match(urlFormat)) {
            notValidURL.push(i + 1);
        }
    }
    return notValidURL;
}