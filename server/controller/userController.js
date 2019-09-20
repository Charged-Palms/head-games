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
    const { gender } = req.session.user;
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
  },
  matchDetails: async (req,res) => {
    //match user details displayed in matchProfile component
    const db = req.app.get("db");
    const { id: user_id } = req.params
    try {
    const match = await db.matched_profile_info([user_id])
    // console.log(match)
    res.status(200).send(match)
    } catch {
      res.status(500).send(console.log('error getting match details'))
    }
  },
    quizProfiles: async (req, res) => {
      const db = req.app.get('db');
      const { user_id } = req.session.user;
      try{
        const profiles = await db.quiz_correct_profile([user_id])
        res.status(200).send(profiles)
      }
      catch(err){
        res.status(500).send(console.log('no profiles where quiz taken = true being received'))
      }

    },
    messages: async (req, res) => {
      const db = req.app.get("db");
      const { match_id } = req.params;
      // const { user_id } = req.session.user;
      // console.log(match_id);
      // console.log(axios.get(`http://localhost:5555/api/messages/${match_id}`).then(res => console.log(res)))
      try {
        const messages = await db.get_messages([match_id]);
        res.status(200).send(messages);
      } catch (err) {
        console.log("not message");
      }
    },
    sendMessage: async (req, res) => {
      const db = req.app.get("db");
      const { match_id } = req.params;
      const { user_id } = req.session.user;
      const { message } = req.body;
      // console.log('match_id', match_id, 'user_id', user_id, 'message', message)
      try {
        const messages = await db.post_message([match_id, user_id, message]);
        res.status(200).send(messages);
      } catch (err) {
        console.log( err,"you ain't do dat rite");
      }
    },
    
  addMatch: async (req, res) => {
    const db = req.app.get('db')
    const {user_id} = req.params
    try {
      await db.add_match([user_id, req.session.user.user_id])
      res.sendStatus(200)
    } catch (err) {
      console.log(err, 'unable to add match')
      res.sendStatus(500)
    }
  }
};
