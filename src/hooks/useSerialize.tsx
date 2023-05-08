import { serializeData } from 'mixin/general';
import { useCallback } from 'react'

var serialize = require('form-serialize')

export default function useSerialize() {
    const formSerialize = useCallback((id?:string, params?:any) => {
        var defaultParams = { hash: true, disabled: true, empty: true }
        var form = document.querySelector('#' + id);
        var obj = serialize(form, {...defaultParams, ...params});
        obj = serializeData(obj)
        return obj
    }, []);
    
    return formSerialize
}