const { getDb } = require("../config/db");
const {ObjectId} = require("mongodb")

async function getUserCredentialsById(id) {
    try {
        const users = getDb().collection("users");
        const credentials = await users.findOne({ _id: new ObjectId(id)})
        return credentials;
    }

        catch (err) {
        console.log("Błąð", err)
        throw new Error("Wewnętrzny błąd serwera.");

}
}
async function deleteUser(id) {
    try {
       const users = getDb().collection("users") 
       await users.deleteOne({_id: new ObjectId(id)});
       return { status: 201, response: { message: "Usunięto pomyślnie"} };
    }
     catch (err) {
        console.error("Błąd", err);
        throw new Error("Wewnętrzny błąd serwera.");
    }
}
async function updateUser(id,name) {
    try {
        const users = getDb().collection("users");
        await users.updateOne(
            {_id: new ObjectId(id)},
            { $set: {name}})
    } catch (err) {
        console.error("Błąd",err)
        throw new Error("Wewnętrzny błąd serwera.");

    }
}
async function getAllUsers() {
  try {
    const usersCollection = getDb().collection("users");
    const users = await usersCollection.find().toArray();

    return users.map(u => ({
      id: u._id.toString(),
      name: u.name || u.email
    }));
  } catch (err) {
    console.error("Błąd pobierania użytkowników", err);
    throw new Error("Nie udało się pobrać użytkowników");
  }
}
module.exports = {getUserCredentialsById, deleteUser, updateUser, getAllUsers};
    