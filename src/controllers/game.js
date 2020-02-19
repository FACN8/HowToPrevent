exports.get = (req, res) => {
    if (res.locals.signedIn) {
        res.render("game", {
            activePage: { game: true },
            name: res.locals.name
        });
    } else {
        res.redirect('/')
    }
};