'use client'
import React, { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { MdLightMode, MdNightlight } from 'react-icons/md'

export default function ThemeButton() {
  const [mount, setMount] = useState(false)
  useEffect(() => {
    setMount(true)
  }, [])
  const { systemTheme, theme, setTheme } = useTheme()

  //   console.log('systemTheme', systemTheme)
  //   let currentTheme = theme === 'system' ? systemTheme : theme

  if (!mount) return null
  // console.log('theme', theme)
  if (theme === 'system') {
    return <MdNightlight size={30} onClick={() => setTheme('dark')} />
  }
  if (theme === 'light') {
    return <MdNightlight size={30} onClick={() => setTheme('dark')} />
  }
  if (theme === 'dark') {
    return (
      <MdLightMode color='yellow' size={30} onClick={() => setTheme('light')} />
    )
  }
}
