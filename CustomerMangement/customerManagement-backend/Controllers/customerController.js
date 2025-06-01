const{ Op } = require('sequelize');
const db = require('../models')
const  Customer  = db.Customer;



const customerController = {

    //Recupération de tous les clients
     async getAllCustomers  (req,res){
        try {
            const customers = await  Customer.findAll({
                order : [['id', 'ASC']]
            });
            res.status(200).json({
                success: true,
                data : customers,
                message : 'Client récupérés avec succés'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message : 'erreur lors de la récupération des clients ',
                error : error.message
            });
        }
    },
    //recherche un client par id 
    async getCustomerById (req,re) {
        const { id } = req.params;
        try { const customer = await Customer.findByPk(id);
    if (!customer) {
      return res.status(404).json({ message: 'Client non trouvé' });
    }
    res.json({ data: customer });
  } catch (error) {
    console.error('Erreur lors de la récupération du client :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
    },
    //Créer un nouveau client 
     async createCustomer  (req,res){
        try {
            const {name ,email, phone ,status} = req.body;

            if(!name || !email){
                return res.status(400).json({
                    success: false,
                    message : 'Le nom et l\'email sont obligatoires'
                })
            }
            
            const newCustomer = await Customer.create({
                name,email,phone: phone || null,status: status|| 'Actif'
            });
            res.status(201).json({
                success : true,
                data: newCustomer,
                message : 'Client crée avec succés'
            })
    
        } catch (error) {
            //GESTION DES ERREURS DE VALIDATIONS
            if (error.name === 'SequelizeValidationError') {
                return res.status(400).json({
                    success : false,
                    message : 'Données invalides',
                    errors : error.errors.map(err => err.message)
                });
            }
            // Gestion des erreurs d'unicité
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({
          success: false,
          message: 'Cet email existe déjà',
          error: error.message
        });
      }
            res.status(500).json({
                success: false,
                message : 'errreur lors de la creation du client',
                error :error.message
            })        
        } 
    },

   // Mettre à jour un client
async updateCustomer(req,res){
    try {
        const { id } =req.params;
        const { name, email,phone,status} = req.body;
        const customerI = await Customer.findByPk(id);

        if (!customerI) {
            return res.status(404).json({
                success : false,
                message : 'Client non trouvé'
            });
        } 
        //Mise à jour
        await customerI.update({
            name : name || customerI.name,
            email : email || customerI.email,
            phone : phone || customerI.phone,
            status : status || customerI.status
        });
        res.status(200).json({
            success : true,
            data : customerI,
            message : 'Cleint mis à jour avec succés '
        })
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({
                success : false,
                message : 'Données invalides',
                errors : error.errors.map(err => err.message)
            });
        }
        if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({
          success: false,
          message: 'Cet email existe déjà',
          error: error.message
        });
      }

        res.status(500).json({
            success : false,
            message :'erreur lors de la mise à jour  du client ',
            error: error.message
        });
        
    }
},

//DELETE CUSTOMER
async deleteCustomer(req,res){
    try {
        const { id } = req.params;
        const customerI = await Customer.findByPk(id);

        if (!customerI) {
            return res.status(404).json({
                success : false,
                message : 'client non trouvé'
            });
        }
        await customerI.destroy();

            res.status(200).json({
                success : true,
                message : 'Client supprimé avce succés '
            });
    } catch (error) {
        res.status(500).json({
            success : false,
            message : 'Erreur lors de la suppression du client ',
            error : error.message 
        });
    }
},

//RECHERCHER DES CLIENTS 
async searchCustomer(req,res){
    try {
        const {query} = req.query;

        if (!query) {
            return res.status(400).json({
                success : false,
                message : 'Paramétre de recherche manquant'
            });
        }

        const customers = await Customer.findAll({
            where : {
                [Op.or]: [
                    { name : { [Op.like]: `%${query}%`}},
                    { email : { [Op.like]: `%${query}%`}},
                    { phone : { [Op.like]: `%${query}%`}},
                    { status : { [Op.like]: `%${query}%`}},
                ]
            }
        });

        res.status(200).json({
            success : true,
            data: customers,
            message : `${customers.length} clients(s) trouvé(s)`
        })
    } catch (error) {
        res.status(500).json({
            success : false,
            message : 'erreur lors de la recherche ',
            error: error.message
    });
    }
}

}
module.exports = customerController;