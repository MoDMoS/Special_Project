module.exports = (connection) => {
    const news = (req, res) => {
        try {
            connection.query("SELECT `TopicNews`, `NewsDetail` FROM `news` WHERE 1", (err, result, fields) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send()
                }
                return res.status(200).json(result)
            })
        } catch (err) {
            console.log(err);
            return res.status(500).send()
        }
    }

    const newspin = (req, res) => {
        try {
            connection.query("SELECT * FROM `news` WHERE `Pin` = 1", (err, result, fields) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send()
                }
                return res.status(200).json(result)
            })
        } catch (err) {
            console.log(err);
            return res.status(500).send()
        }
    }

    return {
        news, newspin
    }
}