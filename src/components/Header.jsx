import  { useEffect, useState } from 'react';
import searchBg from '../images/search1.png';

function Header({ setCityName }) {
    const searchBackground = {
        backgroundImage: `url(${searchBg})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '40px 46px',
        backgroundPosition: '10px 10px',
    };

    function inputData() {
        let inputValue = document.getElementById('searchInput').value;
        setCityName(inputValue); // Pass the value to the parent component
    }
    
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const darkModeBtn = document.getElementById('darkModeBtn');
        if (darkModeBtn) {
            if (darkMode) {
                darkModeBtn.style.marginLeft = '55px';
                document.documentElement.classList.add('dark');
            } else {
                darkModeBtn.style.marginLeft = '';
                darkModeBtn.style.marginRight = '55px';
                document.documentElement.classList.remove('dark');
            }
        }
    }, [darkMode]);

    const themeChange = () => {
        setDarkMode(!darkMode);
    };

    return (
        <header className='flex gap-6 items-center px-[78px] py-[63px] justify-center container mx-auto flex-wrap'>
            {/* Our App logo */}
            
            <div className=' font-extrabold text-2xl dark:text-white mr-5 w-[30px] '>
                 WF
            </div>
            {/* Search Input */}
            <div className='lg:w-[700px] md:w-[700px] '>
                <input
                    id='searchInput'
                    style={searchBackground}
                    className=' dark:bg-[#444444] dark:text-white h-[65px] w-full rounded-[40px] px-16 placeholder:text-[18px] placeholder:font-normal placeholder:text-[#292929] placeholder:leading-normal'
                    type='text'
                    name='inputName'
                    placeholder='Search for your preferred city...'
                />
            </div>
            {/* Search Button */}
            <div onClick={inputData} className='text-white px-10 bg-[#4CBB17] hover:bg-[#2b7c36] transition-all cursor-pointer font-extrabold text-[22px] h-[62px] rounded-[40px] flex items-center justify-center'>
                Search
            </div>
            {/* Dark Mode Button */}
            <div className='w-[100px] flex flex-col justify-center items-center gap-2'>
                <div onClick={themeChange}  className='w-full h-[40px] rounded-[40px] bg-[#D9D9D9] border-2 px-[5px] py-[3px] cursor-pointer'>
                    <div  id='darkModeBtn' className='w-[30px] h-[30px] bg-[#111] rounded-full transition-all '></div>
                </div>
                <span className='text-center w-full text-[12px] ml-2 font-extrabold'>{darkMode? 'Dark Mode' : 'Light Mode'}</span>
            </div>
        </header>
    );
}

export default Header;