

var fs = require("fs");
var xml2js = require("xml2js");
	
function ParseSMS(callback) {
	
	/*
	 * { Date:"xxxx", Address:"xxx", Body:"xxxx" }
	 */
	var SMSParsedData = new Array();
	
	/*
	 * [{ Address:"xxxx", 
	 * 	 sms:[
	 * 	 	{Date:"xxxx", Body:"xxxx"}
	 * 	 ] }, ...]
	 */
	var GroupData = new Array();
	
	var _check_addr_index = function(addr) {
		for(var i=0; i<GroupData.length; i++) {
			if(GroupData[i].Address == addr) {
				return i;
			}
		}
		return -1;
	};
	
    var data = fs.readFileSync("./sms.xml", "utf-8");
       
		var parseString = xml2js.parseString;
		parseString(data, function (err, result) {
			var sms = result.SMSRecord.SMS;
			var num = sms.length;
			console.log("|----------------------------|")
			console.log("| SMS Num: "+num)
			console.log("|----------------------------|")
			
			// Parse sms
			for(var i=0; i<num; i++) {
				var tmp = new Object();
				var Type = sms[i].Type;
				var Date = sms[i].Date;
				var Address = sms[i].Address;
				var Body = sms[i].Body;
				if("object"==typeof(Type)) {
					Type = Type[0]
				}
				if("object"==typeof(Date)) {
					Date = Date[0]
				}
				if("object"==typeof(Address)) {
					Address = Address[0]
				}
				if("object"==typeof(Body)) {
					Body = Body[0]
				}
				
				tmp.Type = Type;	// 1:received,  2:sent
				tmp.Date = Date;
				tmp.Address = Address.replace("+86", "");
				tmp.Body = Body;
				SMSParsedData.push(tmp)
				// console.log("| "+sms[i].Date+"  "+ sms[i].Address +": "+ sms[i].Body)
			}
			
			// Group by address
			for(var i=0; i<num; i++) {
				var index = _check_addr_index(SMSParsedData[i].Address);
				var sms = {Type:SMSParsedData[i].Type, Date:SMSParsedData[i].Date, Body:SMSParsedData[i].Body}
				if(-1 == index) {
					var type = SMSParsedData[i].Type;
					var addr = SMSParsedData[i].Address;
					var newdata = {Address:addr, sms:[sms]}
					GroupData.push(newdata)
				}
				else {
					GroupData[index].sms.push(sms)
				}
			}
			
			// Write in file
			var filename = "parse_sms.json";
			var data = JSON.stringify(GroupData);
			fs.writeFile(filename, data, "utf-8", function() {
				console.log("|---------- Parsed!! --------|")
				console.log("|----------------------------|")
			})
			
		});
}

ParseSMS()
