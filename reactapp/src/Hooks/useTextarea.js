const useTextarea = () => {

  // Auto-ajusta o tamanho do elemento
  function resizeTextarea(e) {
    const element = e.target || e;
    element.style.height = `1.6rem`
    element.style.height = `${element.scrollHeight}px`
  }

  return {
    resizeTextarea,
  }

}

export default useTextarea