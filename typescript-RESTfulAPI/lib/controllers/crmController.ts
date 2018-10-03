//   /lib/controllers/crmController.ts
import * as mongoose from 'mongoose';
import { ContactSchema } from '../models/crmModel';
import { Request, Response } from 'express';

// 'contactos' es el nombre de la colección donde se almacenan los documentos de tipo "Contact".
// Si se escribe en singular, Mongoose lo crea en plural el Mongo. Si se escribe en plural, Mongoose lo mantiene.
const Contact = mongoose.model('contactos', ContactSchema);

export class ContactController{
    public addNewContact (req: Request, res: Response) {                
        let newContact = new Contact(req.body);
    
        newContact.save((err, contact) => {
            if(err){
                res.send(err);
            }    
            res.json(contact);
        });
    }
 
    public getContacts (req: Request, res: Response) {           
        Contact.find({}, (err, contact) => {
            if(err){
                res.send(err);
            }
            res.json(contact);
        });
    }
}    