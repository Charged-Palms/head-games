module.exports = {
  userMatches: async (req, res) => {
    const db = req.app.get("db");
    const { user_id } = req.session.user;
    try {
      const matches = await db.user_matches([user_id]);
      res.status(200).send(matches);
    } catch {
      res.status(500).send(console.log("error: no matches"));
    }
  },
  getCardInfo: async (req, res) => {
    const db = req.app.get("db");
    const { user_id, gender } = req.session.user;
    try {
      if (req.session.user.gender === true) {
        const matches = await db.get_potential_male_matches([gender]);
        res.status(200).send(matches);
      } else {
        const matches = await db.get_potential_female_matches([gender]);
        res.status(200).send(matches);
      }
    } catch (err) {
      console.log(err);
    }
  },
  updateBio: async (req,res) => {
    const db = req.app.get("db");
    const { bio } = req.body
    const { user_id } = req.session.user;
    try {
      const newBio = await db.update_bio({user_id, bio});
      res.status(200).send(newBio)
    } catch (err) {
        console.log(err, "not updating bio")
    }
  }
  // ,
  // addMatch: async (req, res) => {
  //   const db = req.app.get('db')
  //   const {user_id} = req.params
  //   try {
  //     await db.add_match([req.session.user.user_id, user_id])
  //     res.sendStatus(200)
  //   } catch (err) {
  //     console.log(err, 'unable to add match')
  //     res.sendStatus(500)
  //   }
  // },
  // 
  // findMatcheeTopic: async (req, res) => {
  //   const db = req.app.get('db')
  //   const {matchee_id} = req.params
  //   try {
  //     let {topic_id} = db.get_topic_by_user
  //     res.status(200).send(topic_id)
  //   } catch (err) {
  //     console.log(err, 'unable to find topic')
  //     res.sendStatus(500) 
  //   }
  // }
};
