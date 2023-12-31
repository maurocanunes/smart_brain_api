export const handleUserInfo = (id, knex, res) => {
    knex.raw("select id, name, email, joined, entries, " +
                "row_number () over (" + 
                                    "order by entries desc) as rank from users " + 
                                    ` where id = ${id}`)
    .then(result => {
        return res.json(result.rows[0])
    })
    .catch(err =>{
        console.error(err);
        return res.status(400).json('error getting user info')
    })
}

export default handleUserInfo;