// var known_data_instances = []; // Array of URLs to instances of the data service
var known_data_instances = new Map();

var watch = (consul) => {
  // Keep a list of healthy services
  var watcher = consul.watch({
    method: consul.health.service,
    options: {
      service:'data',
      passing:true
    }
  });

  watcher.on('change', data => {
    console.log('received discovery update:', data.length);
    data.forEach(entry => {
      var service = {
        id: entry.Service.ID,
        name: entry.Service.Service,
        address: entry.Service.Address,
        port: entry.Service.Port
      };
      known_data_instances.set(service.id, service);
      // console.log(known_data_instances);
    });
  });

  watcher.on('error', err => {
    console.error('watch error', err);
  });

}

consulDataInstances = (value, func) => {
  var instance=known_data_instances.get(value);
  if(instance===undefined) {
    return func('No service found!!!', undefined);
  }
  func(null, instance);
};

module.exports={watch, consulDataInstances};
