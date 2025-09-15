import React, { useState } from 'react';

const useAddDrug = (indexToRemove) => {
    const [tradeName, setTradeName] = useState(''); //Trade name of drug
    const [genericName, setGenericName] = useState(''); //Generic name of drug
    const [reagents, setReagents] = useState(['']); //Drug reagents to be entered

    const handleChange = (e, index) => {
      // Creamos una copia del array de reactivos
        const newReagents = [...reagents];
      // Actualizamos el valor del reactivo en la posición `index`
        newReagents[index] = e.target.value;
      // Actualizamos el estado con el nuevo array
        setReagents(newReagents); 
    };

    function handleClickPlus() {
        setReagents([...reagents, '']);
    }

    function handleClickLess(indexToRemove) {
        (reagents.length === 1) ? setReagents(['']) : setReagents(reagents.filter((_, index) => index !== indexToRemove)) ;
    }

    const handleChangeInputTradeName = e => setTradeName(e.target.value);
    const handleChangeInputGenericName = e => setGenericName(e.target.value);
    const handleAddDrug = (e, onClickEnter) => {
        onClickEnter(e, tradeName, genericName, reagents);
        setTradeName('');
        setGenericName('');
        setReagents(['']);
    }

    return {
        tradeName,
        genericName,
        reagents,
        handleChangeInputTradeName,
        handleChangeInputGenericName,
        handleChange,
        handleClickPlus,
        handleClickLess,
        handleAddDrug
    }
}

export function ButtonEnter({ onClick, isVisible, onClickEnter }) {
    const { 
        tradeName, 
        genericName, 
        reagents, 
        handleChangeInputTradeName,
        handleChangeInputGenericName, 
        handleChange, 
        handleClickPlus, 
        handleClickLess,
        handleAddDrug
    } = useAddDrug();

    return(
        <section className='flex mt-auto flex-col w-11/12 items-end'>
            <button 
                onClick={onClick} 
                className='flex size-13 m-2.5 p-2.5 bg-[#1e403f] text-white justify-center items-center rounded-full'
            >
                {isVisible ? <i className="fa-solid fa-xmark fa-2x"></i> : <i className="fa-solid fa-plus fa-2x"></i>}
            </button>
            { isVisible && (
                <form className='flex flex-col w-full justify-center flex-wrap gap-1.5'>
                    <input 
                        type='text' 
                        value={tradeName} 
                        onChange={handleChangeInputTradeName} 
                        className='w-full p-1.5 bg-white rounded-xl outline-none border border-[#E0E0E0]' 
                        placeholder='Enter trade name' 
                    />
                    <input 
                        type='text' 
                        value={genericName} 
                        onChange={handleChangeInputGenericName} 
                        className='w-full p-1.5 bg-white rounded-xl outline-none border border-[#E0E0E0]' 
                        placeholder='Enter generic name' 
                    />
                    <p className='font-semibold'>Reagents [ + ]</p>
                    {reagents.map((r, index) => (
                            <div key={index} className="flex relative w-full grow gap-2 justify-center">
                                <input
                                    type='text'
                                    value={r} 
                                    onChange={e => handleChange(e, index)}
                                    className='w-full p-1.5 bg-white rounded-xl flex-grow outline-none border border-[#E0E0E0]'
                                    placeholder='reagents'
                                />
                                <button 
                                    type='button' 
                                    onClick={() => handleClickLess(index)} 
                                    className='flex absolute right-2.5 p-1.5 size-7 aspect-square self-center bg-[#CCCCCC] text-white justify-center items-center rounded-full'
                                >
                                    <i className="fa-solid fa-minus"></i>
                                </button>
                            </div>
                    ))}
                    
                    <button 
                        type='button' 
                        onClick={handleClickPlus} 
                        className='flex mx-auto my-2 p-1.5 size-8 aspect-square text-[#CCCCCC] justify-center items-center rounded-full border'>
                        <i className="fa-solid fa-plus"></i>
                    </button>
                    
                    <button 
                        onClick={e => handleAddDrug(e, onClickEnter)}  
                        className='flex w-full p-1.5 bg-[#1e403f] text-white justify-center rounded-xl'>Save Medicine</button> 
                </form> 
            )}
            
        </section>
    )
}