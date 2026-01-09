const profileService = require('../services/profileService')

async function getUserCredentials(req,res) {
    try {
        const userId = req.params.id
        const credentials = await profileService.getUserCredentialsById(userId);
        
        if(!credentials){
            return res.status(404).json({message:"Użytkownik nie istnieje"});
        }
        return res.json(credentials);
    } catch (err) {
        console.log("Błąd:",err);
        return res.status(500).json({message:"Błąd serwera"})
    }
}
async function deleteUser(req,res) {
    try {
        const userId = req.params.id
        await profileService.deleteUser(userId);
    } catch (err) {
        console.log("Błąd:",err);
        return res.status(500).json({message:"Błąd serwera"});
    }

}
async function updateUser(req,res) {
    try {
        const userId = req.params.id;
        const { name } = req.body;
        await profileService.updateUser(userId,name);  
        res.status(200).json({ message: "Użytkownik zaktualizowany" });
    } catch (err) {
        console.log("Błąd:",err);
        return res.status(500).json({message:"Błąd serwera"});
    }

}
async function getAllUsers(req, res) {
  try {
    const users = await profileService.getAllUsers();
    res.json(users);
  } catch (err) {
    console.error("Błąd:", err);
    res.status(500).json({ message: "Błąd serwera" });
  }
}


module.exports = {getUserCredentials, deleteUser, updateUser, getAllUsers};