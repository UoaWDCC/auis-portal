import peacockLogo from '../assets/peacock-logo.png';
import whiteName from '../assets/auis_white.png';

function Header() {
    return (
        <header className="bg-[#034159] h-[90px] w-full px-[15px] flex justify-between items-center">
                {/* Images and logo */}
                <a className="flex items-center" href="/">
                    <img className="object-contain w-[70px] h-[70px]" src = {peacockLogo}/>
                    <img className="object-contain w-[172px] h-[62px]" src = {whiteName}/>
                </a>
                {/* Links */}
                <nav>
                    <ul className="text-white flex items-center gap-8 text-lg">
                        <li><a className="hover:bg-[#05394d] px-3 py-2 rounded" href="#">Events</a></li>
                        <li><a className="hover:bg-[#05394d] px-3 py-2 rounded" href="/pvv">About Us</a></li>
                        <li><a className="hover:bg-[#05394d] px-3 py-2 rounded" href="/exec">Leadership Team</a></li>
                        <li><a className="hover:bg-[#05394d] px-3 py-2 rounded" href="/credits">Credits</a></li>
                    </ul>
                </nav>
                {/* Login signup buttons */}
                <div className="flex items-center gap-8 px-[10px]">
                    <a href="/login">
                        <button className="bg-[#FC8700] hover:bg-[#fc7300] text-black px-[18px] py-[10px] text-base rounded" style={{borderRadius: '10px' }}>Log-in</button>
                    </a>
                    <a href="/signup">
                        <button className="bg-[#FC8700] hover:bg-[#fc7300] text-black px-[18px] py-[10px] text-base rounded" style={{borderRadius: '10px' }}>Sign-up</button>
                    </a>
                </div>
        </header>
    );
}

export default Header;
