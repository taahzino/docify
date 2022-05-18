const getOne = (req, res) => {
    try {
        res.status(200).json({
            doc: res.locals.doc,
        });
    } catch (error) {
        res.status(500).json({
            message: "Something wrong happened!",
        });
    }
};

module.exports = getOne;
