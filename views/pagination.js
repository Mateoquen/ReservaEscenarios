// ../views/pagination.js
function initializePagination() {
    $('#Table').DataTable({
        "paging": true,
        "lengthMenu": [5, 10, 15],
        "pagingType": "full_numbers",
        "language": {
            "paginate": {
                "next": "Siguiente",
                "previous": "Anterior",
                "first": "Primero",
                "last": "Último"
            },
            "lengthMenu": '<span class="white-text">Mostrar </span>_MENU_<span class="white-text"> registros por página</span>',
            "zeroRecords": "No se encontraron registros",
            "info": "Mostrando página _PAGE_ de _PAGES_",
            "infoEmpty": "No hay registros disponibles",
            "infoFiltered": "(filtrado de _MAX_ registros totales)"
        }
    });
}