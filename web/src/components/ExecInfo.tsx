import ExecCard from '../screens/ExecScreen'

interface Exec {
    id: number; 
    image: string;
    position: string;
    name: string;
    bio: string;
}

const execs: Exec[] = [
    {
        id: 1,
        image: 'exec.png',
        position: 'President',
        name: 'Manas Sonar',
        bio: 'Consectetur adipiscing elit',
    },
    {
        id: 2,
        image: 'exec.png',
        position: 'Vice-President',
        name: 'Sanchani Brabhaharan',
        bio: 'Consectetur adipiscing elit...',
    },
    {
        id: 3,
        image: 'exec.png',
        position: 'Secretary',
        name: 'Diya Chottera',
        bio: 'Consectetur adipiscing elit...',
    },
    {
        id: 4,
        image: 'exec.png',
        position: 'Treasurer',
        name: 'Krish Kumar',
        bio: 'Consectetur adipiscing elit...',
    },
    {
        id: 5,
        image: 'exec.png',
        position: 'Secretary',
        name: 'Diya Chottera',
        bio: 'Consectetur adipiscing elit...',
    },
    {
        id: 6,
        image: 'exec.png',
        position: 'Treasurer',
        name: 'Krish Kumar',
        bio: 'Consectetur adipiscing elit...',
    },
];

function ExecScreen() {
    return (
        <div>
            <ExecCard execs= {execs}/>
        </div>
    );
}

export default ExecScreen;
