var url = "https://alumnoscurso.azure-mobile.net/Tables/Curso";
var fila;
function borrarDatos(o) {
    fila = o.parentNode.parentNode;

    var obj = {
        id: fila.getAttribute("data-id")
    };
    var auxUrl = url + "/" + obj.id;

    $.ajax({
        url: auxUrl,
        type: "DELETE",
        success: function (res) {
            loadAllCursos();
        }
    });
}

function pintarDatos(res) {
    var data = res;
    var salida = "<table>";
    for (var i = 0; i < data.length; i++) {
        salida += "<tr data-id='" + data[i].id + "'>";
        salida += "<td>" + data[i].nombre + "</td>";
        salida += "<td>" + data[i].duracion + "h</td>";
        salida += "<td>" + "<i id='btnEdit' onclick='showEditPanel(this)' class='material-icons'>mode_edit</i> <i id='btnRemove' onclick='borrarDatos(this)' class='material-icons'>delete</i> " + "</td>";
        salida += "</tr>";
    }

    salida += "</table>";
    document.getElementById("data_location").innerHTML = salida;

}

function loadAllCursos() {
    $.get(url, pintarDatos);
}

function showAddBox() {
    if ($("#addBox").is(":visible")) {
        document.getElementById("add_nombre").value = "";
        document.getElementById("add_duracion").value = "";
        $("#addBox").hide();
    } else {
        $("#addBox").show();
    }
}

function addCurso() {
    var obj = {
        nombre: $("#add_nombre").val(),
        duracion: $("#add_duracion").val()
    };
    $.ajax({
        type: "POST",
        url: url,
        success: function (res) {
            loadAllCursos();
            $("#add_nombre").val(" ");
            $("#add_duracion").val(" ");
            $("#addBox").hide();
        },
        error: function (err) {
            console.log(err);
        },
        data: JSON.stringify(obj),
        dataType: "json",
        headers: {
            "Content-Type": "application/json"
        }


    });
}
function filtrarPorNombre() {
    var nombre = $("#search_input").val();

    if (nombre !== "") {
        var auxUrl = url + "?$filter=Nombre eq '" + nombre + "'";
        $.getJSON(auxUrl, pintarDatos);

    }



}
$(document).ready(function () {

    loadAllCursos();

    $("#btnRefresh").click(loadAllCursos);
    $("#showAddBox").click(showAddBox);
    $("#btnAdd").click(addCurso);
    $("#search_btn").click(filtrarPorNombre);

});