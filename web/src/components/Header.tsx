import peacockLogo from '../assets/peacock-logo.png';
import whiteName from '../assets/auis_white.png';

function Header() {
    return (
        <header className="bg-navy-blue h-[100px] w-full px-[15px] flex justify-between items-center">
                <div className="flex items-center">
                    <img className="object-contain w-[77px] h-[77px]" src = {peacockLogo}/>
                    <img className="object-contain w-[192px] h-[69px]" src = {whiteName}/>
                </div>
                <ul className="text-white flex items-center gap-[42px]" style={{ fontSize: '24px' }}>
                    <li>Events</li>
                    <li>About Us</li>
                    <li>Leadership Team</li>
                    <li>Credits</li>
                </ul>
                <div className="flex items-center gap-[30px] px-[10px]">
                    <button className="bg-[#FC8700] text-black px-[19px] py-[12px] text-base rounded" style={{ fontSize: '20px', borderRadius: '10px' }}>Log-in</button>
                    <button className="bg-[#FC8700] text-black px-[19px] py-[12px] text-base rounded" style={{ fontSize: '20px', borderRadius: '10px' }}>Sign-up</button>
                </div>
        </header>
    );
}

export default Header;
