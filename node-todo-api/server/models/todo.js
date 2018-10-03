var mongoose=require('mongoose');

// Crear un modelo //
// Mogoose crea la coleccion automaticamente con nombre en minusculas y en plural //
// El segundo parametro se parece mucho a los Schemas //
var Todo=mongoose.model('Todo', {
  text: {
    type: String,
    // Las valildaciones son: http://mongoosejs.com/docs/validation.html //
    required: true,
    minLenght: 1,
    trim: true // Quita los espeacios en blanco delante y detras //
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  },
  // Se suele poner "_" delante para indicar que es un identificador
  _creator: {
    type: mongoose.Schema.Types.ObjectId, // Para indicar que es un ID
    required: true
  }
});

module.exports = {Todo};
