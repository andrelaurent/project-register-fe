export const serializeData = (data:any) => {
    for (var x in data) {
        if (Array.isArray(data[x])) data[x] = data[x].map((y:any) => (typeof y === 'object') ? serializeData(y) : parser(y))
        else if (typeof data[x] === 'object') data[x] = serializeData(data[x])
        else data[x] = parser(data[x])
    }

    return data
}


export const parser = (data:any) => {
    try {
        var result = JSON.parse(data)
        if (result.objectType === "file") {
            return dataURLtoFile(result.base64, result.name)
        }
        return result
    } catch {
        return data
    }
}

export const dataURLtoFile = (dataurl:any, filename:string) => {
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
        
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
}

export const capitalize = (text:string) => {
    return text && text[0].toUpperCase() + text.slice(1)
}

export const groupBy = (arr:any[], key:string) => {
    const initialValue = {};
    var array:any[] = []
    return arr.reduce((acc, cval) => {
        const myAttribute = cval[key]
        if (myAttribute) {
            if (array.find((item:any) => item.key === cval[key])) array.find((item:any) => item.key === cval[key]).children.push(cval)
            else array.push({ key: cval[key], title: capitalize(cval[key].split('_').join(' ')), type: 'collapse', icon: cval.icon, children: [cval] })   
        } else {
            array.push(cval)
        }
        return array
    }, initialValue)
}