

exports.get = (req, res) => {
    res.render("game", {
      activePage: { game: true },
      signedIn: res.locals.signedIn,
      username: res.locals.user
    });
  };
  
 
 
  

