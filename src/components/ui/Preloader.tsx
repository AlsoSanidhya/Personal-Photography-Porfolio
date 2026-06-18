import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function Preloader() {
    const [expand, setExpand] = useState(false)
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval)
                    setExpand(true)
                    return 100
                }
                return prev + 1
            })
        }, 30)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center overflow-hidden">

            <div className="absolute w-[500px] h-[500px] rounded-full bg-violet-500/10 blur-[140px]" />

            <motion.div
                className="absolute rounded-full bg-white shadow-[0_0_30px_rgba(255,255,255,0.9)]"
                animate={
                    expand
                        ? {
                            scale: 250
                        }
                        : {
                            y: [0, -80, 0],
                            scaleX: [1, 0.85, 1.15, 1],
                            scaleY: [1, 1.15, 0.85, 1]
                        }
                }
                transition={
                    expand
                        ? {
                            duration: 1.2,
                            ease: [0.76, 0, 0.24, 1]
                        }
                        : {
                            duration: 0.9,
                            repeat: Infinity,
                            ease: [0.22, 1, 0.36, 1]
                        }
                }
                style={{
                    width: 16,
                    height: 16
                }}
            />
            <div className="absolute bottom-20 text-zinc-400 text-2xl tracking-[0.2em]">
                {progress}%
            </div>

        </div>
    )
}