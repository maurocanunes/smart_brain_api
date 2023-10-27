import {ClarifaiStub, grpc} from "clarifai-nodejs-grpc";

const USER_ID = '926h3x02micq';       
const APP_ID = 'my-first-application-cjdlr';
const MODEL_ID = 'face-detection';
const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';
const PAT = 'e6c8263fbe7846bb944eb69e9f08533d';

const stub = ClarifaiStub.grpc();

// This will be used by every Clarifai endpoint call
const metadata = new grpc.Metadata();
metadata.set("authorization", "Key " + PAT);


export const handleApiCall = (req, res) => {
    stub.PostModelOutputs(
        {
            user_app_id: {
                "user_id": USER_ID,
                "app_id": APP_ID
            },
            model_id: MODEL_ID,
            version_id: MODEL_VERSION_ID, // This is optional. Defaults to the latest model version
            inputs: [
                { data: { image: { url: req.body.input, allow_duplicate_url: true } } }
            ]
        },
        metadata,
        (err, response) => {
            if (err) {
                throw new Error(err);
            }

            if (response.status.code !== 10000) {
                return res.status(400).text('error detecting image, check your url');
                // throw new Error("Post model outputs failed, status: " + response.status.description);
            }

            // Since we have one input, one output will exist here
            const output = response.outputs[0];
            return res.json(output);
        }

    );
}
 



export const handleImage = (req, res, knex) => {
    // select * 
    // from (
    //         select id, 
    //         name, 
    //         entries, 
    //         row_number () 
    //             over (
    //                     order by entries desc
    //                 ) 
    //                 from users
    // ) 
    // where id = 20;
    const { id } = req.body;
    
    // knex('users')
    //     .where('id', '=', id)
    //     .increment('entries', 1)
    //     .returning('entries')
        // .then(entries => {
        //     console.log(entries)
        //     // res.json(entries[0].entries)
        // })
        // .catch(err => res.status(400).json('unable to put entries'))
    knex.raw("select id, entries, " +
                "row_number () over (" + 
                                    "order by entries desc) as rank from users) " + 
                                    ` where id = ${id}`)
    .then(result => {
        res.json(result.rows[0]);
    })

}