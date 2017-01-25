var ldap = require("ldapjs");
 

var client = ldap.createClient({
 url: 'ldap://10.203.24.216:389'
});
 

var opts = {
 filter: '(uid=kxh)', 
 scope: 'sub',    
 timeLimit: 500    
};
 

client.bind('uid=supbind,cn=users,dc=tiger,dc=com', '123456', function (err, res1) {
 

  client.search('DC=tiger,DC=com', opts, function (err, res2) {
 

    res2.on('searchEntry', function (entry) {
      

      var user = entry.object;
      var userText = JSON.stringify(user,null,2);
      console.log(userText);
      
    });
    
    res2.on('searchReference', function(referral) {
      console.log('referral: ' + referral.uris.join());
    });  
    

    res2.on('error', function(err) {
      console.error('error: ' + err.message);

      client.unbind();
    });
    

    res2.on('end', function(result) {
      console.log('search status: ' + result.status);

      client.unbind();
    });    
    
  });
  
});