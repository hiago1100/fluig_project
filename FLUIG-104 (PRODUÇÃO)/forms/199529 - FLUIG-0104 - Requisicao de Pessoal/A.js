var ZoomModal = function () {
    function a() {
        var d = function (o, p, q, r) {
            if ($.fn.DataTable.isDataTable(o)) {
                var s = $(o).DataTable(); s.destroy()
            }
            $(o).DataTable({ dom: 'Bfrtip', pagingType: 'simple', autoFill: !0, searching: !0, lengthChange: !1, pageLength: 7, columns: p, buttons: [r], scrollY: 200, data: q, language: { sEmptyTable: 'Nenhum registro encontrado', sInfo: 'Mostrando de _START_ at\xE9 _END_ de _TOTAL_ registros', sInfoEmpty: 'Mostrando 0 at\xE9 0 de 0 registros', sInfoFiltered: '(Filtrados de _MAX_ registros)', sInfoPostFix: '', sInfoThousands: '.', sLengthMenu: '_MENU_ resultados por p\xE1gina', sLoadingRecords: 'Carregando...', sProcessing: 'Processando...', sZeroRecords: 'Nenhum registro encontrado', sSearch: 'Pesquisar', oPaginate: { sNext: 'Pr\xF3ximo', sPrevious: 'Anterior', sFirst: 'Primeiro', sLast: '\xDAltimo' }, oAria: { sSortAscending: ': Ordenar colunas de forma ascendente', sSortDescending: ': Ordenar colunas de forma descendente' } } }).on('draw', function () { j(o) }).buttons().container().insertBefore('#tableModal_filter')
        },
            f = function (o, p) {
                if (p) try {
                    $(o).on('hide.bs.modal', function () {
                        $(document).trigger(p)
                    })
                } catch (q) { console.log(q), $(o).remove() } else return
            },
            g = function (o, p, q) {
                var r = n().replace('{0}', o.replace('#', '')).replace('{1}', p.toUpperCase()).replace('{2}', q.replace('#', '')); $('body').append(r)
            },
            h = function (o, p, q) {
                $(p).on('hidden.bs.modal', function () {
                    $(p).modal('dispose')
                }), g(p, o, q), l(p), k()
            },
            i = function (o, p, q) {
                $(p + ' tbody').on('click', 'tr', function () {
                    var r = $(p).DataTable(), s = r.row(this).data();
                    $(document).trigger(q, s), setTimeout(function () { $(o).modal('toggle') }, 500)
                })
            },
            j = function (o) {
                $(o).find('td').each(function (p, q) {
                    $(q).css('fontSize', 11), $(q).css('cursor', 'pointer')
                }),
                    $(o + '_filter input').addClass('form-control').attr('placeholder', 'Pesquisar...'), $('.dt-button').removeClass('ui-button ui-state-default ui-button-text-only buttons-collection buttons-colvis').addClass('btn btn-info btn-sm'), $('#ModalTitle').css('font-weight', 'bold'), $('#ModalTitle').css('font-size', '16px'), $(o + '_next').addClass('btn btn-info btn-md'), $(o + '_next').html('<span class="fluigicon fluigicon-step-forward fluigicon-sm"></span>'), $(o + '_next').removeClass('paginate_button'), $(o + '_previous').addClass('btn btn-info btn-md'), $(o + '_previous').html('<span class="fluigicon fluigicon-step-backward fluigicon-sm"></span>'), $(o + '_previous').removeClass('paginate_button')
            },
            k = function () {
                $('.container-modal').css({ zIndex: '9999', left: '50%', 'margin-top': screen.height / 26 + 'px', 'margin-left': '-' + screen.width / 4 + 'px' })
            },
            l = function (o) {
                $(o).modal('show')
            },
            m = function (o) {
                var p = []; if (p.push({ extend: 'colvis', text: '<i class="fluigicon fluigicon-th fluigicon-sm"></i>', titleAttr: 'Alterar colunas' }), void 0 == o || '' == o || null == o) return p; return 1 == o.filter(t => 'PDF' === t).length && p.push({ extend: 'pdfHtml5', text: '<i class="fluigicon fluigicon-file-pdf fluigicon-sm"></i>', titleAttr: 'Exportar para PDF' }), 1 == o.filter(t => 'EXCEL' === t).length && p.push({ extend: 'excelHtml5', text: '<i class="fluigicon fluigicon-file-xlsx fluigicon-sm"></i>', titleAttr: 'Exportar para Excel' }), p
            },
            n = function () {
                var r = '<div class="modal fade" id="{0}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">'; return r += '<div class="modal-dialog modal-dialog-centered" role="document">', r += '\t\t<div class="modal-content" >', r += '  \t\t<div class="modal-header">', r += '  \t\t\t<div class="row">', r += '  \t\t\t\t<div class="col-md-10">', r += '    \t\t\t\t\t<h5 class="modal-title" id="ModalTitle"><span class="fluigicon fluigicon-search-test fluigicon-md"></span>&nbsp;{1}</h5>', r += '\t\t\t\t\t</div>', r += '  \t\t\t\t<div class="col-md-2">', r += '    \t\t\t\t\t<button type="button" class="close" data-dismiss="modal" aria-label="Close">', r += '      \t\t\t\t\t<span aria-hidden="true">&times;</span>', r += '    \t\t\t\t\t</button>', r += '\t\t\t\t\t</div>', r += '  \t\t</div>', r += '  \t\t<div class="modal-body" id="modalBody">', r += '  \t\t\t<table id="{2}" class="dataTable display compact hover" width="100%"></table>', r += '\t \t\t\t<span id="loadModal"> ', r += '\t\t\t\t\t<h3 align="center"><progress max="10"></progress><br><br>&nbsp;Aguarde... <br><br>processando as informa\xE7\xF5es solicitadas :)</h3>', r += '\t\t\t\t<span>', r += '\t\t\t</div>', r += '\t\t</div>', r += '</div>', r
            };
        return {
            open: function (o, p, q, r, s, t) {
                var u = '#' + Math.floor(1e4 * Math.random() + 1),
                    v = '#tableModal'; h(o, u, v), setTimeout(function () {
                        setTimeout(function () {
                            $('#loadModal').hide(), d(v, p, q, m(s)),
                                j(v), setTimeout(function () {
                                    i(u, v, r), f(u, t),
                                        $(v + '_filter').css('font-size', '0')
                                }, 200)
                        }, 100)
                    }, 1500)
            }
        }
    }

    var b;
    return {
        getInstance:
            function () { return b || (b = a()), b }
    }
}();