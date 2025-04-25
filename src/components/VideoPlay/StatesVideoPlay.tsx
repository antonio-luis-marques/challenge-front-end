import React, { useState } from 'react'

export default function StatesVideoPlay() {
    const [play, setPlay] = useState(false)
    return {
        play,
        setPlay
}
}
