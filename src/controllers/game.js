exports.get = (req, res) => {
    res.render("game", {
        activePage: { game: true },
        name: res.locals.name
    });
};