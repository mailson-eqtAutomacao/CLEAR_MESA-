const platformClient = require("purecloud-platform-client-v2");
const conversationsApi = new platformClient.ConversationsApi();

async function getConversations() {
  //   let pageNumber = 1;
  //   let pageCount = 1;
  let conversationsList = [];

  let body = {
    order: "asc",
    filter: {
      type: "or",
      predicates: [
        {
          dimension: "queueId", //Mesa Distribuição - Reclamação AL
          value: "cd8ba38d-d030-4b3e-8907-4dfea4c252b2",
        },
        {
          dimension: "queueId", //Mesa Distribuição - Reclamação MA
          value: "6ed6bf8f-530f-43a1-903a-54cdd8cc65d8",
        },
        {
          dimension: "queueId", //Mesa Distribuição - Reclamação PA
          value: "b44c3041-218d-446c-a8d2-664f69345c22",
        },
        {
          dimension: "queueId", // Mesa Distribuição - Reclamação PI
          value: "50f27402-1996-4c1f-9bd2-12ce5ac3b4a1",
        },
        {
          dimension: "queueId", //Mesa Distribuição - Reclamação CEA
          value: "8ac2f8fa-b2cc-4c70-aa31-bd2cf25d9ca4",
        },
      ],
    },
    metrics: [
      {
        metric: "oWaiting",
      },
    ],
    groupBy: ["conversationId"],
  };

  try {
    const conversations =
      await conversationsApi.postAnalyticsConversationsActivityQuery(body);

    conversations.results.map((conversations) => {
      conversationsList.push(conversations.group.conversationId);
    });
    return conversationsList;
  } catch (error) {
    console.log(`There was failure to get conversations`);
  }
}

module.exports = getConversations;
