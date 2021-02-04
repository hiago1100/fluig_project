function onNotify(subject, receivers, template, params) {

	if (template.match("TPLPROCESS_NEW_STATE_TO_MANAGER") != null) {

	        receivers.add("fluig@metalfrio.com.br");

	    }
	
	if (template.match("TPLDOCUMENT_APPROVAL_PENDING") != null) {
        	receivers.add("fluig@metalfrio.com.br");
    	}

	}