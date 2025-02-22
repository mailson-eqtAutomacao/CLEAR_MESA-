const { authenticate } = require("../auth/authenticate");
const disconnectConversation = require("../functions/disconnectConversation");
const getConversations = require("../functions/getMesaConversations");

require("dotenv").config();

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const orgRegion = process.env.ORG_REGION;

async function main() {
  try {
    const token = await authenticate(clientId, clientSecret, orgRegion);
    const conversations = await getConversations();
    console.log(conversations);

    for (const conversation of conversations) {
      await disconnectConversation(conversation);
    }

    console.log("Todas as conversas foram desconectadas!");
  } catch (error) {
    console.log(`There was erro do execute main script: \n ${error}`);
  }
}

main();
