const { response, query } = require("express")



const userGet = (req, res = response) => {

    const {q,nombre = "No Name",apikey} = req.query;
    res.json({

        msg: "get API controller ",
        q,
        nombre,
        apikey
    });

}




const userPut = (req, res) => {

    const id = req.params;

    res.json({

        msg: "put API controller",
        id,
    })

}

const userPost = (req, res) => {
    const body = req.body;

    res.json({

        msg: "post API controller ",
        body
    })
}

const userDelete = (req, res) => {
    res.json({

        msg: "delete API controller "
    })
}



module.exports = {
    userGet,
    userPut,
    userPost,
    userDelete


}