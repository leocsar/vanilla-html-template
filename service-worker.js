self.addEventListener('fetch', function(event) {
  event.respondWith(async function() {
    try{
      var res = await fetch(event.request);
      return res;
    }
    catch(error){
      return caches.match(event.request);
    }
  }());
});