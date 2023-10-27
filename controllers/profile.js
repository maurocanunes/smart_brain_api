import handleUserInfo from "./userInfo.js";

export const handleProfileGet = (req, res, knex) => {
    const { id } = req.params;
    return handleUserInfo(id, knex, res);
//     knex.select('*').from('users').where({id})
//     .then(user => {
//         if(user.length) {
//             return res.json(user[0]);
//         } else {
//             res.status(400).json('no such user');
//         }
//     })
//    .catch(err => res.status(400).json('error getting user'))
}

export default handleProfileGet;