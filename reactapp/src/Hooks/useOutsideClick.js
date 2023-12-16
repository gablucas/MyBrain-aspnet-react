import React from 'react'

// Tem como parametros, o estado e função que atualiza os estados
const useOutsideClick = (elements, hideState, setHideState) => {
  
  // Executa quando o estado for atualizado
  React.useEffect(() => {

    // Faz com que o elemento suma quando o click for fora dele
    function handleHideElement(e) {
      if (hideState) {
        if (elements.some((element) => element && element !== e.target)) {
          setHideState(false);
        }
      }
    }

    document.addEventListener('click', handleHideElement)

    // Faz a limpeza a do efeito para que não crie varios eventos de clique
    return () => {
      document.removeEventListener('click', handleHideElement)
    }

  }, [hideState, setHideState, elements])

  

}

export default useOutsideClick