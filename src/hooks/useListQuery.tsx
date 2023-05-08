import { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import { SET_LIST_QUERY, SET_LOG_PATHNAME } from "../constants/actions"
import ListQueryModel from "../models/ListQueryModel"

const useListQuery = () => {
    const location = useLocation()
    const dispatch = useDispatch()
    const { logListQuery, logPathName } = useSelector((state:any) => state.log)
    const [listQuery, setListQuery] = useState<ListQueryModel>(() => logListQuery)

    const defaultListQuery:ListQueryModel = {
        page: 1,
        offset: 0,
        limit: 10,
        order_by: null,
        desc: null,
        filterModel: {}
    }

    useEffect(() => {
        dispatch({ type: SET_LIST_QUERY, payload: listQuery })
    }, [listQuery]) // eslint-disable-line react-hooks/exhaustive-deps

    useMemo(() => {
        if (location.pathname === logPathName) return
        else {
            setListQuery(() => defaultListQuery)
            dispatch({ type: SET_LOG_PATHNAME, payload: location.pathname })
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return {listQuery, setListQuery}
}

export default useListQuery