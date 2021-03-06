// /lib/routes/crmRoutes.ts
import {Request, Response} from "express";
import { ContactController } from "../controllers/crmController";

export class Routes {    
    
    public contactController: ContactController = new ContactController();

    public routes(app): void {   
        
        // Test //
        app.route('/')
        .get((req: Request, res: Response) => {            
            res.status(200).send({
                message: 'GET request successfulll!!!!'
            })
        })
        
        // Contact 
        app.route('/contact') 
        // GET endpoint 
        .get(this.contactController.getContacts)
        // Esto es igual que lo anterior //
/*         
        .get((req: Request, res: Response) => {
            this.contactController.getContacts(req, res)
            })
 */
        // POST endpoint
        // Create new contact         
        .post(this.contactController.addNewContact);


        // Contact detail
        app.route('/contact/:contactId')
        // get specific contact
        .get((req: Request, res: Response) => {
        // Get a single contact detail            
        res.status(200).send({
                message: 'GET request successfulll!!!!'
            })
        })
        .put((req: Request, res: Response) => {
        // Update a contact           
            res.status(200).send({
                message: 'PUT request successfulll!!!!'
            })
        })
        .delete((req: Request, res: Response) => {       
        // Delete a contact     
            res.status(200).send({
                message: 'DELETE request successfulll!!!!'
            })
        })
    }
}