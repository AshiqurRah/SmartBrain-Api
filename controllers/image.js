const {ClarifaiStub, grpc} = require("clarifai-nodejs-grpc");

const stub = ClarifaiStub.grpc();

const metadata = new grpc.Metadata();
metadata.set("authorization", "Key 64ad26ac6c704b758786c94d5275a175");

// const app = new Clarifai.App({
//     apiKey: '64ad26ac6c704b758786c94d5275a175'
// });

// const Clarifai = require('clarifai')
// console.log(Clarifai)


const handleImage = (req, res,db) => {
    const {id} = req.body
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0].entries);
    })
    .catch(err => res.status(400).json('unable to get entries'))
}


const handleAPIcall = (req,res) => {
    stub.PostModelOutputs(
        {
            // This is the model ID of a publicly available General model. You may use any other public or custom model ID.
            model_id: "a403429f2ddf4b49b307e318f00e528b",
            inputs: [{data: {image: {url: req.body.input}}}]
        },
        metadata,
        (err, response) => {
            if (err) {
                console.log("Error: " + err);
                return;
            }
            
            if (response.status.code !== 10000) {
                console.log("Received failed status: " + response.status.description + "\n" + response.status.details);
                return;
            }
            
            console.log("Predicted concepts, with confidence values:")
            for (const c of response.outputs[0].data.concepts) {
                console.log(c.name + ": " + c.value);
            }
            res.json(response)
        }
        );
        // app.models
        // .predict(
        //     // HEADS UP! Sometimes the Clarifai Models can be down or not working as they are constantly getting updated.
        //     // A good way to check if the model you are using is up, is to check them on the clarifai website. For example,
        //     // for the Face Detect Mode: https://www.clarifai.com/models/face-detection
        //     // If that isn't working, then that means you will have to wait until their servers are back up. Another solution
        //     // is to use a different version of their model that works like the ones found here: https://github.com/Clarifai/clarifai-javascript/blob/master/src/index.js
        //     // so you would change from:
        //     // .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
        //     // to:
        //     // .predict('53e1df302c079b3db8a0a36033ed2d15', this.state.input)
        //     Clarifai.FACE_DETECT_MODEL,
        //     req.body.input).then(data => {
        //         res.json(data)
        //     })
        //     .catch(err => res.status(400).json('unable to work with API'))
    }
    
    module.exports = {
        handleImage: handleImage,
        handleAPIcall: handleAPIcall
    }