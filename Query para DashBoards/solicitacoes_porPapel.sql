SELECT TOP 100 count(idi_status) AS QUANTIDADE, CD_MATRICULA 
FROM dbo.TAR_PROCES 
WHERE idi_status = '0' 
AND CD_MATRICULA 
LIKE '%Pool:Role%' 
GROUP BY CD_MATRICULA