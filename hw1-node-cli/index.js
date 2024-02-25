const { program } = require("commander");
const contacts = require("./db");
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

// TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      return console.log(await contacts.listContacts());
    case "get":
      return console.log(await contacts.getContactById(id));
    case "remove":
      return console.log(await contacts.removeContact(id));
    case "add":
      return console.log(await contacts.addContact([name, phone, email]));
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
