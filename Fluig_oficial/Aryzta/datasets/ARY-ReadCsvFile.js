function defineStructure() {

}
function createDataset(fields, constraints, sortFields) {
	
	log.info("### DATASET ARY-ReadCsvFile");
	
	var newDataset =  DatasetBuilder.newDataset();
	 newDataset.addColumn("cod_program"); 
	 newDataset.addColumn("description_program");
	 newDataset.addColumn("cod_rotina"); 
	 newDataset.addColumn("description_rotina");
	 newDataset.addColumn("cod_modulo"); 
	 newDataset.addColumn("description_modulo");
	 newDataset.addColumn("especific"); 
	 newDataset.addColumn("upc");
	// imports java
	var IOException = new java.io.IOException();
	var data = new java.util.Date();
	var FileReader =  new java.io.FileReader("C:\\fluig\\csv.csv");
	var BufferedReader = new java.io.BufferedReader(FileReader);
	
	var FileNotFoundException = new java.io.FileNotFoundException();
	
	try{
		
		
		var linha;
		var i = 0;
		log.info("### ENTROU NO TRY "+ BufferedReader);
		while (( linha = BufferedReader.readLine()) != null){

		var row2 = [] ;
		row2 = linha.split(";");
		
		newDataset.addRow([row2[0].replace('"',""),row2[1].replace('"',""),row2[2].replace('"',""),row2[3].replace('"',""),row2[4].replace('"',""),row2[5].replace('"',""),row2[6].replace('"',""),row2[7].replace('"',"")]);
		  
		var i = i+1;
		log.info("***CONTADOR : "+i);
		}
			

		BufferedReader.close();
		
	 	}catch(e){
		//dataset.addRow([data,i,"true",e]);
		log.info("@@@ entrou no catch "+e);
	};
	
	return newDataset;
}