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
  }
};
