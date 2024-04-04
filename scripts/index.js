class Activity {
  constructor(id, title, description, imgUrl) {
    this.id = id;
    this.title= title;
    this.description = description;
    this.imgUrl = imgUrl;
  }
}

class Repository {
  constructor() {
    this.activities = [];
    this.id = 0;
  }
  getAllActivities() {
    return this.activities;
  }
  createActivity(title, description, imgUrl) {
    this.id++;
    const actividad = new Activity(this.id, title, description, imgUrl);
    this.activities.push(actividad);
  }
  deleteActivity(id){
    this.activities = this.activities.filter(activity => activity.id !== id);
  }

}
const repository= new Repository;

function convertirElementoHTML(Activity) {
    const { id, title, description, imgUrl } = Activity;

    const tituloElemento = document.createElement('h3');
    tituloElemento.innerHTML = title;
    tituloElemento.id = 'titleCard';

    const descripcionElemento = document.createElement('p');
    descripcionElemento.innerHTML = description;
    descripcionElemento.id = 'descriptionCard';

    const imagenElemento = document.createElement('img');
    imagenElemento.src = imgUrl;
    imagenElemento.id = 'imgURLCard';

   
    const contenedorTarjeta = document.createElement('div');
    contenedorTarjeta.id = 'containerCard';


    const deleteButton = document.createElement('button')
    deleteButton.id = 'deleteButton'
    deleteButton.textContent = 'X'
    

    
    contenedorTarjeta.appendChild(deleteButton);
    contenedorTarjeta.appendChild(tituloElemento);
    contenedorTarjeta.appendChild(descripcionElemento);
    contenedorTarjeta.appendChild(imagenElemento);
    contenedorTarjeta.dataset.id = id;

    deleteButton.addEventListener("click", (event)=>{
      const id = parseInt(contenedorTarjeta.dataset.id);
      repository.deleteActivity(id);
      convertirActivity();
    })
    
    return contenedorTarjeta;
}
function convertirActivity(){
    

const tarjetasActSection = document.getElementById('Cards');
tarjetasActSection.innerHTML= '';

const listActivities=repository.getAllActivities();

const newListActivities=listActivities.map(convertirElementoHTML)

 newListActivities.forEach(activity => {
    tarjetasActSection.appendChild(activity);
})}

function handler(){
    const title= document.getElementById('title');
    const description= document.getElementById('description');
    const img= document.getElementById('imgUrl');
    
    const titleValue= title.value;
    const descriptionValue= description.value;
    const imgValue=img.value;

    if (titleValue === '' || descriptionValue === '' || imgValue === '') {
      alert("Por favor completa todos los campos.");
      return;
    }

    repository.createActivity(titleValue,descriptionValue,imgValue);
    convertirActivity();
}

const buttonAgregar= document.getElementById('agregarActividad');
buttonAgregar.addEventListener("click", handler);

