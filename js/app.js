/**
 * Todolist
 */
var app = {
  init: function() {
     // je crée une propriété container dans l'objet app
    // cette propriété sera accessible dans toutes les méthodes executées ensuite
    app.container = document.getElementById('todo');

    app.createForm();
    app.createCounter();
    app.createList();
  },

  createCounter: () => {
    // je crée
    app.counter = document.createElement('p');
    // je configure
    app.counter.className = 'counter';
    app.counter.textContent = 'Aucune tâche en cours';
    // j'insère
    app.container.appendChild(app.counter);
  },

  createForm: () => {
    let form = document.createElement('FORM');
    form.method = 'POST';
    form.id = 'task-form';
    app.container.appendChild(form);
  
    app.input = document.createElement('INPUT');
    app.input.type = 'TEXT';
    app.input.id = 'task';
    app.input.placeholder = 'Ajouter une tâche';
    form.appendChild(app.input);

    form.addEventListener('submit', app.handleSubmit);
  },

  createList: () => {
    // objectif créer la liste :
    // créer un ul
    app.list = document.createElement('ul');
    // le configurer
    app.list.className = 'tasks';
    // l'insérer
    app.container.appendChild(app.list);
  },

  handleSubmit: (event) => {
    // j'empeche la soumission par défaut
    event.preventDefault();
    // je veux récupérer la valeur du champ
    const taskValue = app.input.value;
    // puis le vider
    app.input.value = '';
    // pour cette valeur, j'ajoute une tache
    app.generateTask(taskValue);
  },

  generateTask: (text) => {
    // créer un li
    const item = document.createElement('li');
    // le configurer (ex écrire son texte)
    // on crée le label
    const label = document.createElement('label');
    // on crée un champ checkbox
    const checkbox = document.createElement('input');
    // on configure le champ
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', function(event) {
      event.target.closest('li').classList.toggle('done');
      // je mets à jour le compteur
      app.updateCounter();
    });
    // on crée un span avec le text
    const span = document.createElement('span');
    span.textContent = text; 
    // on insère le champ dans le label
    label.appendChild(checkbox);
    // on insère le span dans le label
    label.appendChild(span);
    // on insère le label dans li
    item.appendChild(label);
    // l'insérer dans la liste
    app.list.appendChild(item);
    // je mets à jour le compteur
    app.updateCounter();
  },

    updateCounter: () => {
    // cibler toutes les taches et le compter
    const tasksNumber = document.querySelectorAll('li:not(.done)').length;
    // modifier le texte du compteur
    if (tasksNumber === 1) {
      app.counter.textContent = 'Une tâche en cours';
    }
    else if (tasksNumber === 0) {
      app.counter.textContent = 'Aucune tâche en cours';
    }
    else {
      app.counter.textContent = `${tasksNumber} tâches en cours`;
    }
  },
  
};

// Chargement du DOM
document.addEventListener('DOMContentLoaded', app.init);

