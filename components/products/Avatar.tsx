import Image from 'next/image'
import { VscAccount } from "react-icons/vsc";

interface AvatarProps {
    src?: string | null | undefined
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {
    if (src) {
        return <Image
            src={src}
            alt="Avartar"
            className='rounded-full'
            height='30'
            width='30'
        />
    }
    return <div>
        <VscAccount />
    </div>;
}

export default Avatar;