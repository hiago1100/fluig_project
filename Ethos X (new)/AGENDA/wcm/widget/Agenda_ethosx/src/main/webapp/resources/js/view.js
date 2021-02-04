

document.addEventListener('DOMContentLoaded', function() {
   
        var object = {
                      title: 'Teste Hiago',
                      start: '2020-11-18',
                      end: '2020-11-20',
                      analista: 'Hiago'
                    };

        var calendarEl = document.getElementById('calendar');
        var calendar = new FullCalendar.Calendar(calendarEl, {
          initialView: 'dayGridMonth',
           selectable: true,
           selectHelper: true,
           eventLimit: true,
           events: [object],
       // Convert the allDay from string to boolean
        eventRender : function(event, element, view) {
            if (event.allDay === 'true') {
                event.allDay = true;
            } else {
                event.allDay = false;
            }
        },

        eventClick: function(event) {

          var titulo = event.event._def.title;
          var inicio = event.event._instance.range.start;
              inicio = moment(inicio).format('DD/MM/YYYY');
          var fim = event.event._instance.range.end;       
              fim = moment(fim).format('DD/MM/YYYY');   
          var analista = event.event.extendedProps.analista;

          console.log('TITULO: ' + titulo + ' INICIO: ' +inicio+ ' FIM: ' + fim + ' ANALISTA: ' +  analista);

          infoEvents();

    },

});

      calendar.render();

      var settings = {
        source: {
            url: '/api/public/ecm/dataset/search?datasetId=ds_analista&searchField=nomeAnalista&',
            contentType: 'application/json',
            root: 'content',
            limit: 0,
            offset: 0,
            patternKey: 'searchValue',
            limitkey: 'limit',
            offsetKey: 'offset'
        },
        displayKey: 'NOMECOMP',
        multiSelect: false,
        style: {
          autocompleteTagClass: 'tag-gray',
          tableSelectedLineClass: 'info'
        },
        table: {
            header: [
                {
                    'title': 'Analista',
                    'dataorder': 'NOMECOMP',
                    'standard': true
                }
            ],
            renderContent: ['NOMECOMP']
        }
    };

    console.log(settings);
     
    var filter = FLUIGC.filter('#cpAnalista', settings);

});


function agendaProtheus(analista){} 

function infoEvents(){

    var htmlAux = '<div>' ;
        htmlAux += '</div>';
 
    FLUIGC.message.alert({
        message: '<p style="background-color:green;">Teste</p>',
        title: 'Message',
        label: 'OK'
    }, function(el, ev) {

    });
}