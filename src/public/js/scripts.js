$('#post-comment').hide(); //va a estar por defecto oculto
$('#btn-toggle-comment').click(e => {
    e.preventDefault();
    $('#post-comment').slideToggle(); //slidetoggle oculta el archivo
});

$('#btn-like').click(function (e){
    e.preventDefault();
    let imageId = $(this).data('id'); //busca en este boto la data(image.uniqueId);
    $.post('/image/' + imageId + '/like') //envia un metodo post a la direccion siguiente
        .done(data => { //cuando termine mostrar
            $('.likes-count').text(data.likes); //busca la clase likes-count y cuando la encuentres modifica el texto por el data y busca la propiedad like
        });
});

$('#btn-delete').click(function (e){
    e.preventDefault();
    let $this = $(this);
    const response = confirm('¿Estas Seguro De Que Quiere Eliminar La Imagen?. No Se Podra Recuperar Los Datos');
    if (response){
        let imageId = $this.data('id');
        $.ajax({
            url: '/image/' + imageId,
            type: 'DELETE'
        }).done(function (resuls){
            $this.removeClass('button').addClass('button2');
            $this.find('i').removeClass('fa-exclamation-circle').addClass('fa-check'); //busca en este boton el icono remueve la clase y ponle otra
            alert('Se Ha Borrado Tu Imagen Satisfactoriamente');
        });
    };
});