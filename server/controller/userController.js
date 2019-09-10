
module.exports = {
    userMatches: async (req,res) => {
        const db = req.app.get('db')
        const { user_id } = req.session.user
        try {
            const matches = await db.user_matches([user_id])
            res.status(200).send(matches)
        }
        catch {
            res.status(500).send(console.log('error: no matches'))
        }
    }
}