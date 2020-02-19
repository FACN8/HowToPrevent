exports.get = (req, res) => {

    if (res.locals.signedIn) {
  let auto_price = Math.pow(res.locals.level_auto,2)*1000;
if(auto_price===0){auto_price=1000}
  const userProfile = {
    id: res.locals.id,
    name: res.locals.name,
    coins: res.locals.coins,
    level_attack: res.locals.level_attack,
    level_attack_price: Math.pow(res.locals.level_attack,2)*200,
    level_auto: res.locals.level_auto,
    level_auto_price:  auto_price
  };
  res.render("game", {
    activePage: { game: true },
    userProfile
  });
};
    } else {
        res.redirect('/')
    }
};

