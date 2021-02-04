Select c.num_proces, v.num_seq,x.num_seq_estado, u.status, case STATUS 
    when 0 then 'Aberto' when 2 then 'Finalizado' when 1 then 'Cancelado' 
    else '' end as den_status,case when STATUS = 0 
    and t.deadline < GETDATE() then 'Atrasado' when 
    STATUS = 0 then v.DES_ESTADO when STATUS = 2 then 'Finalizado' when 
    STATUS = 1 then 'Cancelado' else '' end as den_status_processo,
    ISNULL(t.deadline,'') as prazo_tarefa, t.deadline as deadline,a.dtAtual, a.cpEmpreendimento
    from ML0012472 a 
    join documento b on ( b.COD_EMPRESA = a.companyid and b.NR_DOCUMENTO = a.documentid and b.NR_VERSAO = a.version and b.VERSAO_ATIVA = 1 )
    join anexo_proces c on (c.cod_empresa = b.cod_empresa and c.NR_DOCUMENTO = b.NR_DOCUMENTO and c.NR_VERSAO = b.NR_VERSAO) 
    join proces_workflow u on ( u.COD_EMPRESA = c.COD_EMPRESA and u.NUM_PROCES = c.NUM_PROCES )
    left join tar_proces t on (t.COD_EMPRESA = c.COD_EMPRESA and t.NUM_PROCES = c.NUM_PROCES and t.LOG_ATIV = '1' )
    left join histor_proces x on (x.COD_EMPRESA = t.COD_EMPRESA and x.NUM_PROCES = t.NUM_PROCES and x.NUM_SEQ_MOVTO = t.NUM_SEQ_MOVTO)
    left join estado_proces v on (v.COD_EMPRESA = t.COD_EMPRESA and v.COD_DEF_PROCES = u.COD_DEF_PROCES and v.NUM_SEQ = x.NUM_SEQ_ESTADO and v.NUM_VERS = u.NUM_VERS)


       -- SELECT b.NUM_PROCES AS PROCESSO, START_DATE AS DATA_INICIO  
       --  FROM HISTOR_PROCES a 
       -- JOIN proces_workflow b ON (a.COD_EMPRESA = b.COD_EMPRESA AND a.NUM_PROCES = b.NUM_PROCES) 
       --  WHERE b.COD_DEF_PROCES = 'FLUIG-0239'  


        