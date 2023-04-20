const { TeamsActivityHandler } = require("botbuilder");
const { SupplierME } = require("./messageExtensions/supplierME");
const { ContactME } = require("./messageExtensions/contactME");

class TeamsBot extends TeamsActivityHandler {
  constructor() {
    super();
  }

  // Message extension Code
  // Search.
  async handleTeamsMessagingExtensionQuery(context, query) {

    const queryName = query.parameters[0].name;
    const searchQuery = query.parameters[0].value;

    switch (queryName) {
      case "supplierME":  // Search for suppliers
        return await SupplierME.query(context, searchQuery);
      case "contactME":  // Search for contacts
        return await ContactME.query(context, searchQuery);
      default:
        return null;
    }
  }


  async handleTeamsMessagingExtensionSelectItem(context, item) {

    switch (item.queryType) {
      case "supplierME":  // Search for suppliers
        return SupplierME.selectItem(context, item);
      case "contactME":  // Search for contacts
        return ContactME.selectItem(context, item);
      default:
        return null;
    }

  }

  async handleTeamsMessagingExtensionFetchTask(context, action) {

    switch (action.commandId) {
      case "generateMessage": {
        return await GenerateMessageME.fetchTask(context, action);
      }
      case "replyToMessage": {
        return await ReplyME.fetchTask(context, action);
      }
      default: {
        return null;
      }
    }
  }

}

module.exports.TeamsBot = TeamsBot;
