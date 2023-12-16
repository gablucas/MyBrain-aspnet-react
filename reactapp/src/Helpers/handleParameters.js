function addOrUpdateEndpointParameter(url, key, value) {
    var updatedUrl = url.replace(new RegExp('([?&])' + key + '=.*?(&|$)'), '$1' + key + '=' + encodeURIComponent(value) + '$2');
  
    if (url.indexOf(key + '=') === -1) {
        // Se o parâmetro não existir, adicione
        updatedUrl += (updatedUrl.indexOf('?') === -1 ? '?' : '&') + key + '=' + encodeURIComponent(value);
    }
  
    return updatedUrl;
  }
  
  function removeEndpointParameterValue(url, key) {
    // Substitua o valor do parâmetro por uma string vazia
    var updatedUrl = url.replace(new RegExp('([?&])' + key + '=.*?(&|$)'), '$1' + key + '=$2');
  
    return updatedUrl;
  }
  
  function getEndpointParameterValue(url, key) {
    // Use uma expressão regular para encontrar o valor do parâmetro
    var match = url.match(new RegExp('[?&]' + key + '=([^&]*)'));
    
    // Se o parâmetro for encontrado, retorne o valor, caso contrário, retorne null
    return match ? decodeURIComponent(match[1]) : null;
  }
  
  export { addOrUpdateEndpointParameter, removeEndpointParameterValue, getEndpointParameterValue };