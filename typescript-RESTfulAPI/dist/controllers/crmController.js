"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//   /lib/controllers/crmController.ts
const mongoose = require("mongoose");
const crmModel_1 = require("../models/crmModel");
// 'contactos' es el nombre de la colección donde se almacenan los documentos de tipo "Contact".
// Si se escribe en singular, Mongoose lo crea en plural el Mongo. Si se escribe en plural, Mongoose lo mantiene.
const Contact = mongoose.model('contactos', crmModel_1.ContactSchema);
class ContactController {
    addNewContact(req, res) {
        let newContact = new Contact(req.body);
        newContact.save((err, contact) => {
            if (err) {
                res.send(err);
            }
            res.json(contact);
        });
    }
    getContacts(req, res) {
        Contact.find({}, (err, contact) => {
            if (err) {
                res.send(err);
            }
            res.json(contact);
        });
    }
}
exports.ContactController = ContactController;
//# sourceMappingURL=crmController.js.map