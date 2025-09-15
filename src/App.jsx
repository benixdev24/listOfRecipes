import { useState, useEffect } from 'react'
import { Tool } from './components/Tool.jsx'

function App() {
  const [isVisible, setIsVisible] = useState(false); //is visible to enter drugs
  const [drugs, setDrugs] = useState(() => {
    try {
      const storedDrugs = localStorage.getItem('drugs');
      return storedDrugs ? JSON.parse(storedDrugs) : [];
    } catch (error) {
      console.error("Error al cargar las notas de localStorage:", error);
      return [];
    }
  }); //each of the medicines entered

  useEffect(() => {
    localStorage.setItem('drugs', JSON.stringify(drugs));
  },[drugs])

  function handleClick(isVisible) {
    isVisible ? setIsVisible(false) : setIsVisible(true);
  }

  function handleClickEnter(e, tradeName, genericName, reagents) {
    e.preventDefault();
    if (tradeName.trim() == '' && genericName.trim() == '') return;
    const reagentsInUpper = reagents.map(r => r.toLowerCase());
    setDrugs([...drugs, {'tradeName': tradeName.toLowerCase(), 'genericName': genericName.toLowerCase(), 'reagents': reagentsInUpper }]);
    alert('Drug enter');
  }

  return (
    <section className="flex relative flex-col w-full h-fit min-h-screen bg-[#F0F0F0] items-center">
      <h1 className="w-full mb-2.5 pt-10 pb-5 bg-[#1e403f] text-center text-white text-3xl font-semibold">List of recipes</h1>
      <Tool 
        drugs={drugs} 
        isVisibleEnter={() => handleClick(true)} 
        isVisible={isVisible} 
        onClickEnter={handleClickEnter}
        onClickHandleClick={() => handleClick(isVisible)}
      />
      <p className='w-full my-4 pt-4 text-center text-[#1e403f]'>Developer for: <a href='https://benixdev.netlify.app/' target='_blank'>Albenis Ruiz</a></p>
    </section>
  )
}

export default App
