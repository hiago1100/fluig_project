function XmlRead(url)
{
	var result = "";
	var url = new java.net.URL(url);
	var connection = url.openConnection();
	
	connection.setRequestMethod("GET");
	connection.setRequestProperty("Accept", "text/plain");
	
	if (connection.getResponseCode() != 200) 
	{
		throw "Failed : HTTP error code : " + connection.getResponseCode();
	}
	
	var br = new java.io.BufferedReader(new java.io.InputStreamReader(connection.getInputStream()));

	while ((output = br.readLine()) != null) {

		result += output;
	}	
	
	return result;
}