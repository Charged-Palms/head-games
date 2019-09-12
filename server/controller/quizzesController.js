module.exports = {
  getTopics: async (req, res) => {
    const db = req.app.get("db");
    try {
      const topicArr = await db.get_quiz_topics();
      res.status(200).send(topicArr);
    } catch {
      res.status(500).send(console.log("Error getting Quiz Topics"));
    }
  },

  getQuestions: async (req, res) => {
    const db = req.app.get("db");
    try {
      const questionArr = await db.get_quiz_questions();
      res.status(200).send(questionArr);
    } catch {
      res.status(500).send(console.log("Eror getting Quiz Questions"));
    }
  },

  getQuestionsByTopic: async (req, res) => {
    const db = req.app.get('db')
    const {topic_id} = req.session.user
    try {
      const questionArr = await db.get_quiz_questions_by_topic([topic_id])
      res.status(200).send(questionArr)
    } catch {
      res.status(500).then(() => console.log('unable to retrieve quiz questions'))
    }
  }
};
