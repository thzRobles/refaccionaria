function ConfirmDelete(){
    let respuesta = confirm("Esta seguro que desea Eliminar el vehiculo y todos sus servicios?");
    if (respuesta == true) {
        return true;
    } else {
        return false
    }
}

function ConfirmDeleteServ(){
    let respuesta = confirm("Esta seguro que desea Eliminar el servicio del vehiculo?");
    if (respuesta == true) {
        return true;
    } else {
        return false
    }
}