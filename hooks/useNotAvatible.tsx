import toast from 'react-hot-toast';

const useNotAvatible  = () => {
    const notAvatibleAllert = () => {
        toast.error("Нажаль, дана функція недоступна")
    }

    return {
        notAvatibleAllert
    }
}

export default useNotAvatible