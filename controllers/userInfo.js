export const handleUserInfo = (id, knex) => {
    knex.raw("select id, name, email, joined, entries, " +
                "row_number () over (" + 
                                    "order by entries desc) as rank from users) " + 
                                    ` where id = ${id}`)
    .then(result => {
        return result[0]
    })
}

export default handleUserInfo;