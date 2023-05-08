interface ListQueryModel {
    page: number
    offset: number
    limit: number
    order_by: string | null
    desc: string | null
    filterModel: any
}

export default ListQueryModel