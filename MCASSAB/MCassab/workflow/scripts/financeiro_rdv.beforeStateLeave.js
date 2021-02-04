function beforeStateLeave(sequenceId) {
	
	log.info(">>>>>>>>>>>>>> beforeStateLeave sequenceId: " + sequenceId);
    
}

String.prototype.escape = function () {
    return this.replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t");
}
